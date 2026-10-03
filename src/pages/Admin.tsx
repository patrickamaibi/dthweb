import { FormEvent, useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import type { Session } from "@supabase/supabase-js";
import StarRating from "../components/StarRating";
import { BUCKET, imageUrl, SITE_URL, supabase, Testimonial } from "../lib/supabase";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-transparent p-2.5 dark:border-gray-600";
const btnClass =
  "rounded-lg border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600";

function makeToken(length = 10) {
  // No look-alike characters (0/O, 1/l/I)
  const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

const reviewLink = (token: string) => `${SITE_URL}/review/${token}`;

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-16">
      <Helmet>
        <title>Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      {!supabase ? (
        <p>Supabase keys are missing. Add them to .env and rebuild.</p>
      ) : checking ? (
        <p>Loading…</p>
      ) : session ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-4">
      <h1 className="text-2xl font-bold">Admin sign in</h1>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={inputClass}
      />
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={inputClass}
      />
      {error && <p className="text-red-600">{error}</p>}
      <button className="rounded-lg bg-black px-5 py-2.5 text-white dark:bg-white dark:text-black">
        Sign in
      </button>
    </form>
  );
}

type Draft = {
  client_name: string;
  company: string;
  service: string;
  rating: number;
  message: string;
};

function Dashboard() {
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [note, setNote] = useState("");
  const [form, setForm] = useState({ client_name: "", company: "", service: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase!
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setNote(error.message);
    else setRows(data as Testimonial[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function copy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setNote(`${label} copied.`);
  }

  async function createInvite(e: FormEvent) {
    e.preventDefault();
    const token = makeToken();
    const { error } = await supabase!.from("testimonials").insert({
      token,
      client_name: form.client_name.trim(),
      company: form.company.trim() || null,
      service: form.service.trim() || null,
    });
    if (error) {
      setNote(error.message);
      return;
    }
    setForm({ client_name: "", company: "", service: "" });
    await copy(reviewLink(token), "Review link");
    load();
  }

  async function update(id: string, patch: Partial<Testimonial>) {
    const { error } = await supabase!.from("testimonials").update(patch).eq("id", id);
    if (error) setNote(error.message);
    else {
      setNote("Saved.");
      load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this entry permanently?")) return;
    const victim = rows.find((r) => r.id === id);
    if (victim?.image_path) await supabase!.storage.from(BUCKET).remove([victim.image_path]);
    const { error } = await supabase!.from("testimonials").delete().eq("id", id);
    if (error) setNote(error.message);
    else load();
  }

  function startEdit(t: Testimonial) {
    setEditId(t.id);
    setDraft({
      client_name: t.client_name,
      company: t.company ?? "",
      service: t.service ?? "",
      rating: t.rating ?? 0,
      message: t.message ?? "",
    });
  }

  async function saveEdit(id: string) {
    if (!draft) return;
    await update(id, {
      client_name: draft.client_name.trim(),
      company: draft.company.trim() || null,
      service: draft.service.trim() || null,
      rating: draft.rating || null,
      message: draft.message.trim() || null,
    });
    setEditId(null);
    setDraft(null);
  }

  const whatsapp = (t: Testimonial) =>
    `https://wa.me/?text=${encodeURIComponent(
      `Hello ${t.client_name}, thank you for working with DiscoveryTech Hub. Please share a quick review of our service here: ${reviewLink(t.token)}`
    )}`;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <button className={btnClass} onClick={() => supabase!.auth.signOut()}>
          Sign out
        </button>
      </div>

      <form onSubmit={createInvite} className="space-y-3 rounded-xl border border-gray-200 p-5 dark:border-gray-700">
        <h2 className="font-semibold">Create a review link</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <input
            required
            value={form.client_name}
            onChange={(e) => setForm({ ...form, client_name: e.target.value })}
            placeholder="Client name"
            className={inputClass}
          />
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company (optional)"
            className={inputClass}
          />
          <input
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            placeholder="Service (optional)"
            className={inputClass}
          />
        </div>
        <button className="rounded-lg bg-black px-5 py-2.5 text-white dark:bg-white dark:text-black">
          Create link and copy
        </button>
      </form>

      {note && (
        <p role="status" className="text-sm text-gray-600 dark:text-gray-300">
          {note}
        </p>
      )}

      <ul className="space-y-4">
        {rows.length === 0 && <li className="text-gray-500">No entries yet.</li>}
        {rows.map((t) => (
          <li key={t.id} className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
            {editId === t.id && draft ? (
              <div className="space-y-3">
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    value={draft.client_name}
                    onChange={(e) => setDraft({ ...draft, client_name: e.target.value })}
                    className={inputClass}
                    aria-label="Client name"
                  />
                  <input
                    value={draft.company}
                    onChange={(e) => setDraft({ ...draft, company: e.target.value })}
                    className={inputClass}
                    placeholder="Company"
                    aria-label="Company"
                  />
                  <input
                    value={draft.service}
                    onChange={(e) => setDraft({ ...draft, service: e.target.value })}
                    className={inputClass}
                    placeholder="Service"
                    aria-label="Service"
                  />
                </div>
                <StarRating
                  value={draft.rating}
                  onChange={(n) => setDraft({ ...draft, rating: n })}
                />
                <textarea
                  value={draft.message}
                  onChange={(e) => setDraft({ ...draft, message: e.target.value })}
                  rows={5}
                  className={inputClass}
                  aria-label="Review text"
                />
                <div className="flex gap-2">
                  {t.image_path && (
                    <button
                      className={btnClass}
                      onClick={async () => {
                        await supabase!.storage.from(BUCKET).remove([t.image_path!]);
                        await update(t.id, { image_path: null });
                        setEditId(null);
                        setDraft(null);
                      }}
                    >
                      Remove picture
                    </button>
                  )}
                  <button className={btnClass} onClick={() => saveEdit(t.id)}>
                    Save changes
                  </button>
                  <button
                    className={btnClass}
                    onClick={() => {
                      setEditId(null);
                      setDraft(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">
                    {t.client_name}
                    {t.company ? `, ${t.company}` : ""}
                    {t.service ? (
                      <span className="font-normal text-gray-500"> · {t.service}</span>
                    ) : null}
                  </p>
                  <span className="rounded-full border border-gray-300 px-2.5 py-0.5 text-xs dark:border-gray-600">
                    {t.status === "pending" ? "Waiting for client" : t.status === "live" ? "Live" : "Hidden"}
                  </span>
                </div>

                {t.image_path ? (
                  <img src={imageUrl(t.image_path)} alt="" className="mt-3 h-14 w-14 rounded-lg border border-gray-200 bg-white object-contain p-0.5 dark:border-gray-700" />
                ) : null}
                {t.rating ? <div className="mt-2"><StarRating value={t.rating} size={18} /></div> : null}
                {t.message && <p className="mt-2 whitespace-pre-line">{t.message}</p>}

                <div className="mt-4 flex flex-wrap gap-2">
                  {t.status === "pending" && (
                    <>
                      <button className={btnClass} onClick={() => copy(reviewLink(t.token), "Review link")}>
                        Copy link
                      </button>
                      <a className={btnClass} href={whatsapp(t)} target="_blank" rel="noreferrer">
                        Send on WhatsApp
                      </a>
                    </>
                  )}
                  {t.status !== "pending" && (
                    <>
                      <button className={btnClass} onClick={() => startEdit(t)}>
                        Edit
                      </button>
                      <button
                        className={btnClass}
                        onClick={() => update(t.id, { status: t.status === "live" ? "hidden" : "live" })}
                      >
                        {t.status === "live" ? "Hide from site" : "Show on site"}
                      </button>
                    </>
                  )}
                  <button className={btnClass} onClick={() => remove(t.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
