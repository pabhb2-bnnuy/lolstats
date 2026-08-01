"use client";

import { useEffect, useState } from "react";

export default function AnimatedBody({
  children,
}: {
  children: React.ReactNode;
}) {
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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {children}

      {showOverlay && (
        <div className="fixed inset-0 z-[9999] bg-black animate-fade-out pointer-events-none" />
      )}
    </div>
  );
}