"use client";

import { useEffect } from "react";

export function GoRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return null;
}
