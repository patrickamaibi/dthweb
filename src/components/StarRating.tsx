type Props = {
  value: number;
  onChange?: (n: number) => void;
  size?: number;
};

function Star({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={filled ? "text-amber-500" : "text-gray-300 dark:text-gray-600"}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function StarRating({ value, onChange, size = 20 }: Props) {
  const stars = [1, 2, 3, 4, 5];

  if (!onChange) {
    return (
      <div
        role="img"
        aria-label={`${value} out of 5 stars`}
        className="inline-flex gap-0.5"
      >
        {stars.map((n) => (
          <Star key={n} filled={n <= value} size={size} />
        ))}
      </div>
    );
  }

  return (
    <div role="radiogroup" aria-label="Rating" className="inline-flex gap-1">
      {stars.map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          className="rounded p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <Star filled={n <= value} size={size} />
        </button>
      ))}
    </div>
  );
}
