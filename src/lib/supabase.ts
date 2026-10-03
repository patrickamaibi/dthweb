import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// null when the keys are missing (for example a build without .env).
// Pages handle this by showing nothing instead of crashing.
export const supabase = url && key ? createClient(url, key) : null;

export const SITE_URL = "https://discoverytechhub.com";
export const BUCKET = "testimonial-images";

export type Testimonial = {
  id: string;
  token: string;
  client_name: string;
  company: string | null;
  service: string | null;
  rating: number | null;
  message: string | null;
  image_path: string | null;
  status: "pending" | "live" | "hidden";
  created_at: string;
  submitted_at: string | null;
};

export type PublicTestimonial = Pick<
  Testimonial,
  "id" | "client_name" | "company" | "service" | "rating" | "message" | "image_path" | "submitted_at"
>;

export function imageUrl(path: string): string {
  if (!supabase) return "";
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function fetchLiveTestimonials(limit?: number): Promise<PublicTestimonial[]> {
  if (!supabase) return [];
  let query = supabase
    .from("testimonials")
    .select("id, client_name, company, service, rating, message, image_path, submitted_at")
    .eq("status", "live")
    .order("submitted_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error || !data) return [];
  return data as PublicTestimonial[];
}
