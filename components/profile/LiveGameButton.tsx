"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LiveGameButtonProps {
  summonerId: string;
  region: string;
}

export default function LiveGameButton({
  summonerId,
  region,
}: LiveGameButtonProps) {
  const router = useRouter();

  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(false);

  async function checkLive(redirect = false) {
    if (!summonerId) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/live/${encodeURIComponent(summonerId)}?region=${region}`,
        {
          cache: "no-store",
        },
      );

      const data = await res.json();

      const isLive = Boolean(data.live);

      setLive(isLive);

      // SOLO entra si has pulsado el botón
      if (isLive && redirect) {
        router.push(`/live/${region}/${summonerId}`);
      }
    } catch {
      setLive(false);
    } finally {
      setLoading(false);
    }
  }

  // Solo comprueba, NO REDIRECT
  useEffect(() => {
    checkLive(false);
  }, [summonerId, region]);

  return (
    <button
      onClick={() => checkLive(true)}
      disabled={loading}
      className={`
        flex
        items-center
        gap-3

        rounded-xl
        border
        border-white/10

        bg-linear-to-r
        from-slate-950
        via-indigo-950
        to-slate-900

        bg-size-[300%_300%]
        animate-gradient

        px-5
        py-4

        shadow-lg
        shadow-black/30

        transition-all
        duration-300

        ${
          loading
            ? "cursor-wait opacity-70"
            : "cursor-pointer hover:scale-105 hover:border-white/20"
        }
      `}
    >
      <span
        className={`
          h-3
          w-3
          rounded-full
          shrink-0

          ${live ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}
        `}
      />

      <div
        className="
        flex
        flex-col
        leading-tight
        "
      >
        <span
          className="
          text-sm
          font-bold
          text-white
          "
        >
          {loading
            ? "Comprobando..."
            : live
              ? "Entrar en partida"
              : "No está en partida"}
        </span>

        <span
          className="
          text-xs
          text-slate-300
          "
        >
          {loading
            ? "Consultando Riot..."
            : live
              ? "Ver jugadores"
              : "Pulsa para actualizar"}
        </span>
      </div>
    </button>
  );
}
