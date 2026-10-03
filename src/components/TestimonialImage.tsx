import { imageUrl } from "../lib/supabase";

type Props = { path: string | null; name: string; size?: number };

// Shows a client's photo or logo. Renders nothing when there is none.
export default function TestimonialImage({ path, name, size = 48 }: Props) {
  if (!path) return null;
  return (
    <img
      src={imageUrl(path)}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      style={{ width: size, height: size }}
      className="shrink-0 rounded-lg border border-gray-200 bg-white object-contain p-0.5 dark:border-gray-700"
    />
  );
}
