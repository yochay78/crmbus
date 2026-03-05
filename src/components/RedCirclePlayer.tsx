"use client";

import { useEffect, useRef } from "react";

export function RedCirclePlayer({
  showId,
  episodeId,
}: {
  showId: string;
  episodeId: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = `https://api.podcache.net/embedded-player/sh/${showId}/ep/${episodeId}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (typeof (window as any).redcircleIframe === "function") {
        (window as any).redcircleIframe();
      }
    };
    containerRef.current.appendChild(script);

    return () => {
      script.remove();
    };
  }, [showId, episodeId]);

  return (
    <div ref={containerRef}>
      <div className={`redcirclePlayer-${episodeId}`} />
      <style>{`
        .redcircle-link:link,
        .redcircle-link:hover,
        .redcircle-link:active,
        .redcircle-link:visited {
          color: #ea404d;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
