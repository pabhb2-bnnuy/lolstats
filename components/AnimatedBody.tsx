"use client";

import { useEffect, useState } from "react";

export default function AnimatedBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Empieza visible
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem("intro");

    if (alreadyPlayed) {
      setShowOverlay(false);
      return;
    }

    sessionStorage.setItem("intro", "true");

    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}

      {showOverlay && (
        <div className="fixed inset-0 z-9999 bg-black animate-fade-out pointer-events-none" />
      )}
    </>
  );
}
