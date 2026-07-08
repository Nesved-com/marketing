"use client";

import { useEffect, useState } from "react";

/** Guards client-only rendering (portals, canvas/video effects) until after hydration. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
