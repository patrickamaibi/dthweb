import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import StarRating from "../components/StarRating";
import { BUCKET, supabase } from "../lib/supabase";

type Invite = { client_name: string; company: string | null; service: string | null };
type Phase = "loading" | "ready" | "invalid" | "done";

const ALLOWED = ["image/png", "image/jpeg", "image/webp"];
const EXT: Record<string, string> = { "image/webp": "webp", "image/png": "png", "image/jpeg": "jpg" };

// Shrinks the picture in the browser so uploads stay small and fast.
async function resizeImage(file: File, max = 480): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale);
  const h = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");
  ctx.drawImage(bmp, 0, 0, w, h);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.85)
  );
  if (!blob) throw new Error("Could not encode image");
  return blob;
}

export default function Review() {
  const { token = "" } = useParams();
  const [phase, setPhase] = useState<Phase>("loading");
  const [invite, setInvite] = useState<Invite | null>(null);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setPhase("invalid");
      return;
    }
    supabase.rpc("get_invite", { p_token: token }).then(({ data, error }) => {
      if (error || !data || data.length === 0) {
        setPhase("invalid");
      } else {
        setInvite(data[0] as Invite);
        setPhase("ready");
      }
    });
  }, [token]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function onPick(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!ALLOWED.includes(f.type)) {
      setError("Use a PNG, JPG or WebP image.");
      e.target.value = "";
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("That image is too large. Choose one under 10 MB.");
      e.target.value = "";
      return;
    }
    setError("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function clearPicture() {
    setFile(null);
    setPreview(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (rating < 1) {
      setError("Choose a star rating.");
      return;
    }
    if (message.trim().length < 10) {
      setError("Write at least one full sentence (10 characters or more).");
      return;
    }
    setBusy(true);
    setError("");

    let imagePath: string | null = null;
    if (file) {
      try {
        const blob = await resizeImage(file);
        const ext = EXT[blob.type] ?? "png";
        const path = `${token}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, blob, { contentType: blob.type, upsert: false });
        if (uploadError) throw uploadError;
        imagePath = path;
      } catch {
        setBusy(false);
        setError("We couldn't upload your picture. Try another image, or remove it and submit without one.");
        return;
      }
    }

    const { data, error: rpcError } = await supabase.rpc("submit_review", {
      p_token: token,
      p_rating: rating,
      p_message: message,
      p_image_path: imagePath,
    });
    setBusy(false);
    if (rpcError || data !== true) {
      setError("We couldn't save your review. This link may already have been used.");
    } else {
      setPhase("done");
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 pt-28 pb-16">
      <Helmet>
        <title>Review DiscoveryTech Hub</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {phase === "loading" && <p className="text-gray-500">Loading…</p>}

      {phase === "invalid" && (
        <div>
          <h1 className="text-2xl font-bold">This review link isn't active</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            It may have been used already, or the link is incomplete. Contact
            DiscoveryTech Hub and we'll send you a new one.
          </p>
        </div>
      )}

      {phase === "done" && (
        <div>
          <h1 className="text-2xl font-bold">Thank you for your review</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Your feedback is now on our website. We appreciate you taking the time.
          </p>
        </div>
      )}

      {phase === "ready" && invite && (
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">How was working with us, {invite.client_name}?</h1>
            {invite.service && (
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Service: {invite.service}
              </p>
            )}
          </div>

          <div>
            <p className="mb-2 font-medium">Your rating</p>
            <StarRating value={rating} onChange={setRating} size={34} />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block font-medium">
              Your review
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              maxLength={1000}
              className="w-full rounded-lg border border-gray-300 bg-transparent p-3 dark:border-gray-600"
              placeholder="What did we do for you, and how did it go?"
            />
            <p className="mt-1 text-sm text-gray-500">{message.length}/1000</p>
          </div>

          <div>
            <label htmlFor="picture" className="mb-2 block font-medium">
              Your photo or company logo (optional)
            </label>
            {preview ? (
              <div className="flex items-center gap-4">
                <img
                  src={preview}
                  alt="Your selected picture"
                  className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain p-1 dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={clearPicture}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600"
                >
                  Remove picture
                </button>
              </div>
            ) : (
              <input
                id="picture"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={onPick}
                className="block w-full text-sm"
              />
            )}
            <p className="mt-1 text-sm text-gray-500">PNG, JPG or WebP. A square image works best.</p>
          </div>

          {error && (
            <p role="alert" className="text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-black px-6 py-3 font-medium text-white disabled:opacity-60 dark:bg-white dark:text-black"
          >
            {busy ? "Sending…" : "Submit review"}
          </button>

          <p className="text-sm text-gray-500">
            Your review, name{invite.company ? ", company" : ""}
            {file ? " and picture" : ""} will be shown on discoverytechhub.com.
          </p>
        </form>
      )}
    </div>
  );
}
