"use client";

import { useState } from "react";
import MatchCard from "./MatchCard";

interface LoadMoreMatchesProps {
  initialMatches: any[];
  puuid: string;
  champions: Record<string, string>;
}

export default function LoadMoreMatches({
  initialMatches,
  puuid,
  champions,
}: LoadMoreMatchesProps) {
  const [matches, setMatches] = useState(initialMatches);

  const [loading, setLoading] = useState(false);

  async function loadMore() {
    try {
      setLoading(true);

      const res = await fetch(`/api/matches/${puuid}?start=${matches.length}`);

      const newMatches = await res.json();

      if (!Array.isArray(newMatches)) {
        console.error("Respuesta incorrecta:", newMatches);

        return;
      }

      setMatches((prev) => {
        const merged = [...prev, ...newMatches];

        const unique = Array.from(
          new Map(
            merged.map((match: any) => [match.metadata.matchId, match]),
          ).values(),
        );

        return unique;
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
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-indigo-900/60
          disabled:opacity-50
        "
      >
        {loading ? "Cargando..." : "Cargar más partidas"}
      </button>
    </>
  );
}
