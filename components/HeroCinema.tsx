"use client";
import { useState } from "react";

export function HeroCinema({
  video,
  image,
  className = "",
}: {
  video?: string;
  image: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`hero-film ${className}`} aria-hidden>
      {!failed && video ? (
        <video
          className="hero-film-img"
          autoPlay
          muted
          loop
          playsInline
          poster={image}
          onError={() => setFailed(true)}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img className="hero-film-img" src={image} alt="" />
      )}
    </div>
  );
}
