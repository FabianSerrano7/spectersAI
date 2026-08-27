"use client";

import { useState } from "react";
import { RotatingWord } from "./rotating-word";

const SIZE_NORMAL = "text-4xl sm:text-5xl md:text-6xl lg:text-7xl";
const SIZE_COMPACT = "text-4xl sm:text-4xl md:text-5xl lg:text-6xl";
const LONG_WORD_THRESHOLD = 13;

export function HeroHeadline({ words }: { words: string[] }) {
  const [word, setWord] = useState(words[0]);
  const isLong = word.length > LONG_WORD_THRESHOLD;

  return (
    <span className={isLong ? SIZE_COMPACT : SIZE_NORMAL}>
      Automatizamos lo repetitivo{" "}
      <span className="whitespace-nowrap">y construimos</span> software para tu{" "}
      <RotatingWord words={words} onChange={setWord} />{" "}
      <span className="whitespace-nowrap">con IA</span>
    </span>
  );
}
