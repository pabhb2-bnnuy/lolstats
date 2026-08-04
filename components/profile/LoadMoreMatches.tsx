"use client";

import { useState } from "react";
import MatchCard from "./MatchCard";

interface LoadMoreMatchesProps {
  initialMatches: any[];
  puuid: string;
  champions: Record<string, string>;
  region: string;
}

export default function LoadMoreMatches({
  initialMatches,
  puuid,
  champions,
   region,
}: LoadMoreMatchesProps) {
  const [matches, setMatches] = useState(initialMatches);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/matches/${puuid}?start=${matches.length}&count=5`,
      );

      const newMatches = await res.json();

      if (!Array.isArray(newMatches)) {
        console.error("Respuesta incorrecta:", newMatches);
        return;
      }

      setMatches((prev) => {
        const merged = [...prev, ...newMatches];

        return Array.from(
          new Map(
            merged.map((match: any) => [match.metadata.matchId, match]),
          ).values(),
        );
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="space-y-3">
        {matches.map((match) => (
    <MatchCard
  key={match.metadata.matchId}
  match={match}
  puuid={puuid}
  champions={champions}
  region={region}
/>
        ))}
      </div>

      <button
        onClick={loadMore}
        disabled={loading}
        className="
          mt-6
          w-full
          rounded-xl
          border
          border-indigo-400/30

          bg-indigo-950/40

          px-4
          py-3

          text-sm
          font-semibold
          text-white

          transition-all
          duration-200

          hover:bg-indigo-900/60
          active:scale-[0.98]

          disabled:cursor-not-allowed
          disabled:opacity-50

          sm:text-base
        "
      >
        {loading ? "Cargando..." : "Cargar más partidas"}
      </button>
    </>
  );
}
