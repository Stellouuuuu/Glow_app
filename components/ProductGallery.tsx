"use client";

import { useRef, useState } from "react";

// Photos du produit : défilement horizontal au doigt (scroll-snap), points indicateurs en bas.
export default function ProductGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function onScroll() {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  function go(i: number) {
    const el = track.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <>
      <div className="pd-slides" ref={track} onScroll={onScroll}>
        {photos.map((src, i) => (
          <div className="pd-slide" key={src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={i === 0 ? alt : `${alt} - photo ${i + 1}`} className="prod-photo" draggable={false} />
          </div>
        ))}
      </div>
      {photos.length > 1 && (
        <>
          {index > 0 && (
            <button type="button" className="pd-arrow prev" aria-label="Photo précédente" onClick={() => go(index - 1)}>
              ‹
            </button>
          )}
          {index < photos.length - 1 && (
            <button type="button" className="pd-arrow next" aria-label="Photo suivante" onClick={() => go(index + 1)}>
              ›
            </button>
          )}
          <div className="pd-dots" aria-hidden="true">
            {photos.map((src, i) => (
              <span key={src} className={`pd-dot${i === index ? " on" : ""}`} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
