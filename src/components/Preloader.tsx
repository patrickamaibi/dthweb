import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MIN_DISPLAY_MS = 2000;

export default function Preloader() {
  // The static preloader from index.html only exists on a full page load.
  // If it is missing, the React preloader below is used instead.
  const [isFirstLoad] = useState(
    () => typeof document !== "undefined" && !!document.getElementById("static-preloader")
  );
  const [loading, setLoading] = useState(!isFirstLoad);

  useEffect(() => {
    if (isFirstLoad) {
      const el = document.getElementById("static-preloader");
      // The prerender script keeps the static preloader in the saved HTML
      if (!el || (window as any).__PRERENDER__) return;

      let removeTimer: ReturnType<typeof setTimeout> | undefined;
      // Count the 2 seconds from page start, not from when React mounts
      const wait = Math.max(0, MIN_DISPLAY_MS - performance.now());
      const hideTimer = setTimeout(() => {
        el.classList.add("hide");
        removeTimer = setTimeout(() => el.remove(), 500);
      }, wait);

      return () => {
        clearTimeout(hideTimer);
        if (removeTimer) clearTimeout(removeTimer);
      };
    }

    // Original behaviour when there is no static preloader
    const timer = setTimeout(() => setLoading(false), MIN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [isFirstLoad]);

  if (isFirstLoad) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-gray-950"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="text-center"
          >
            <img src="/logo.png" alt="DiscoveryTech Hub" className="h-24 md:h-32 w-auto mx-auto mb-8 object-contain" />
            <motion.div className="h-1 w-48 bg-blue-100 dark:bg-gray-700 rounded-full mx-auto overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-blue-600 dark:bg-blue-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}