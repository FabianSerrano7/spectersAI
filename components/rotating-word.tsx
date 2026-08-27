"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function RotatingWord({
  words,
  intervalMs = 2200,
  onChange,
}: {
  words: string[];
  intervalMs?: number;
  onChange?: (word: string) => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  useEffect(() => {
    onChange?.(words[index]);
  }, [index, words, onChange]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
        className="inline-block text-coral"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}
