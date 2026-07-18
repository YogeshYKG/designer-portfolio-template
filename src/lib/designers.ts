// lib/designers.ts

import varun from "@/data/varun.json";

const designers = {
  varun,
};

export function getDesigner(slug: string) {
  return designers[slug as keyof typeof designers] ?? null;
}