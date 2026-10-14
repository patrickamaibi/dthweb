import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED = ["https://discoverytechhub.com", "https://www.discoverytechhub.com", "http://localhost:5173"];

const FROM = Deno.env.get("FROM_EMAIL") ?? "DiscoveryTech Academy <academy@discoverytechhub.com>";
const REPLY_TO = "info@discoverytechhub.com";
const LOGO_URL = "https://discoverytechhub.com/logo.png"; // must be a PNG or JPG that exists on the live site

const cors = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && ALLOWED.includes(origin) ? origin : ALLOWED[0],
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
});

const emailHtml = (position: number | null) => {
  const pass = position
    ? `
     <tr><td style="padding:8px 40px 8px;">
       <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#12275c;border-radius:16px;border-left:6px solid #008751;">
        <tr><td style="padding:20px 24px;">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#93c5fd;">Founding learner pass</p>
          <p style="margin:10px 0 4px;font-family:'Courier New',monospace;font-size:38px;font-weight:700;color:#fde68a;">#${String(position).padStart(4, "0")}</p>
          <p style="margin:0;font-size:13px;color:#b6c2e2;">DiscoveryTech Academy &middot; Admit one</p>
        </td></tr>
       </table>
     </td></tr>`
    : "";

  return `
<!doctype html>
<html><body style="margin:0;padding:0;background:#050b1f;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050b1f;padding:40px 16px;">
 <tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0b1530;border:1px solid #1e2d5a;border-radius:24px;overflow:hidden;font-family:Inter,Arial,sans-serif;">
   <tr><td style="height:6px;background:linear-gradient(90deg,#2563eb,#22d3ee);font-size:0;">&nbsp;</td></tr>
   <tr><td style="padding:36px 40px 8px;">
     <img src="${LOGO_URL}" width="56" height="56" alt="DiscoveryTech Hub" style="display:block;width:56px;height:56px;border-radius:14px;margin:0 0 18px;background:#ffffff;">
     <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#60a5fa;font-weight:700;">DiscoveryTech Academy</p>
     <h1 style="margin:14px 0 0;font-size:30px;line-height:1.2;color:#ffffff;">Your seat is reserved. &#127881;</h1>
   </td></tr>
   <tr><td style="padding:16px 40px 8px;color:#b6c2e2;font-size:16px;line-height:1.7;">
     Thanks for joining the waitlist. You're now first in line when DiscoveryTech Academy opens its doors.
   </td></tr>
   ${pass}
   <tr><td style="padding:16px 40px;">
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#101c3f;border-radius:16px;">
      <tr><td style="padding:20px 24px;color:#dbe4ff;font-size:15px;line-height:1.9;">
        &#10003; &nbsp;Early access before public launch<br>
        &#10003; &nbsp;A short lesson every day, at your own pace<br>
        &#10003; &nbsp;Practical skills, no coding required
      </td></tr>
     </table>
   </td></tr>
   <tr><td style="padding:8px 40px 36px;">
     <a href="https://discoverytechhub.com" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:12px;">Visit DiscoveryTech Hub</a>
   </td></tr>
   <tr><td style="padding:24px 40px;border-top:1px solid #1e2d5a;color:#6f7fa8;font-size:12px;line-height:1.6;">
     You received this because you joined the Academy waitlist at discoverytechhub.com.<br>
     DiscoveryTech Hub &middot; Abuja, Nigeria
   </td></tr>
  </table>
 </td></tr>
</table>
</body></html>`;
};

type Db = ReturnType<typeof createClient>;

// Position = how many people joined on or before this signup
async function rank(db: Db, createdAt: string): Promise<number | null> {
  const { count } = await db
    .from("academy_waitlist")
    .select("id", { count: "exact", head: true })
    .lte("created_at", createdAt);
  return count ?? null;
}

Deno.serve(async (req) => {
  const headers = cors(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers });

  try {
    const body = await req.json();
    const value = String(body?.email ?? "").trim().toLowerCase();
    const source =
      String(body?.source ?? "waitlist-page").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40) ||
      "waitlist-page";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length > 254) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400, headers });
    }

    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { data: row, error } = await db
      .from("academy_waitlist")
      .insert({ email: value, source })
      .select("created_at")
      .single();

    // Already on the list: no second email, but return their original position
    if (error?.code === "23505") {
      const { data: existing } = await db
        .from("academy_waitlist")
        .select("created_at")
        .eq("email", value)
        .single();
      const position = existing ? await rank(db, existing.created_at as string) : null;
      return new Response(JSON.stringify({ ok: true, already: true, position }), { headers });
    }
    if (error) throw error;

    const position = await rank(db, row!.created_at as string);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [value],
        reply_to: REPLY_TO,
        subject: "Your seat is reserved: DiscoveryTech Academy waitlist 🎉",
        html: emailHtml(position),
      }),
    });
    if (!res.ok) console.error("Resend error:", await res.text()); // signup is saved even if the email fails

    return new Response(JSON.stringify({ ok: true, position }), { headers });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500, headers });
  }
});
