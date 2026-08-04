function timeAgo(timestamp: number) {
  const now = Date.now();

  const diff = now - timestamp;

  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `Hace ${minutes} minutos`;
  }

  if (hours < 24) {
    return `Hace ${hours} horas`;
  }

  return `Hace ${days} días`;
}

import Link from "next/link";

import { getQueueName, getQueueColor } from "@/lib/utils/matches";

import {
  getMatchPlayer,
  getTeamPlayers,
  getEnemyPlayers,
} from "@/lib/utils/matchPlayers";

import TeamIcons from "./TeamIcons";

interface MatchCardProps {
  match: any;
  puuid: string;
  champions: Record<string, string>;
  region: string;
}

export default function MatchCard({
  match,
  puuid,
  champions,
  region,
}: MatchCardProps) {
  const player = getMatchPlayer(match, puuid);

  if (!player) {
    return null;
  }

  const win = player.win;

  const playedAt = timeAgo(match.info.gameCreation);

  const teamMates = getTeamPlayers(match, player.teamId);

  const enemies = getEnemyPlayers(match, player.teamId);

  const renderPlayer = (p: any) => (
    <Link
      key={p.puuid}
      href={`/summoner/${p.riotIdTagline}/${encodeURIComponent(
        p.riotIdGameName,
      )}/${encodeURIComponent(p.riotIdTagline)}`}
      className="
      flex
      items-center
      gap-2
      rounded
      px-1
      py-0.5

      transition-colors

      hover:bg-white/5
    "
    >
      <img
        src={champions[p.championName.replace(/['\\s]/g, "").toLowerCase()]}
        alt={p.championName}
        className="h-5 w-5 rounded"
      />

      <span
        className="
        max-w-[110px]
        truncate
        text-xs
        text-slate-300
      "
      >
        {p.riotIdGameName}
      </span>
    </Link>
  );

  // Ej: "15.15.694.1234" -> "15.15.1"
  const patch = match.info.gameVersion.split(".").slice(0, 2).join(".") + ".1";

  const items = [
    player.item0,
    player.item1,
    player.item2,
    player.item3,
    player.item4,
    player.item5,
  ];

  return (
    <div
      className={`
        rounded-xl
        border
        p-4
        transition
        duration-300
        hover:scale-[1.02]

        ${
          win
            ? `
              border-emerald-400/40
              bg-linear-to-br
              from-emerald-400/50
              via-slate-900
              to-indigo-950/80
            `
            : `
              border-rose-400/40
              bg-linear-to-br
              from-red-500/60
              via-slate-900
              to-indigo-950/80
            `
        }
      `}
    >
      <div
        className="
          flex
          flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:gap-6
        "
      >
        {/* Campeón */}

        <div className="flex items-center gap-4">
          <img
            src={
              champions[player.championName.replace(/['\s]/g, "").toLowerCase()]
            }
            alt={player.championName}
            loading="lazy"
            className="
      h-14
      w-14
      rounded-xl
    "
          />

          <div className="flex flex-col gap-2">
            <div>
              <p
                className="
        text-sm
        text-purple-200 font-bold t
        mb-1
      "
              >
                {playedAt}
              </p>

              <h3
                className="
        text-lg
        font-bold
        text-white
      "
              >
                {player.championName}
              </h3>

              <p
                className="
          text-sm
          font-bold
        "
              >
                <span className="text-white">{player.kills}</span>

                <span className="text-slate-500">{" / "}</span>

                <span className="text-rose-400">{player.deaths}</span>

                <span className="text-slate-500">{" / "}</span>

                <span className="text-cyan-400">{player.assists}</span>
              </p>
            </div>

            {/* Objetos */}
            <div className="flex  gap-1">
              {items.map((itemId: number, index: number) =>
                itemId !== 0 ? (
                  <img
                    key={index}
                    src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${itemId}.png`}
                    alt={`Item ${itemId}`}
                    loading="lazy"
                    className="h-8 w-8 rounded-md border border-slate-700"
                    onError={(e) => {
                      // Fallback por si el parche no existe en Data Dragon
                      e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/img/item/${itemId}.png`;
                    }}
                  />
                ) : (
                  <div
                    key={index}
                    className="h-8 w-8 rounded-md border border-slate-700 bg-slate-800/60"
                  />
                ),
              )}

              {player.item6 !== 0 && (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${player.item6}.png`}
                  alt="Trinket"
                  loading="lazy"
                  className="ml-2 h-8 w-8 rounded-full border border-yellow-500/50"
                  onError={(e) => {
                    e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/img/item/${player.item6}.png`;
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Equipos + info */}
        <div
          className="
    ml-auto

    grid
    grid-cols-[1fr_auto]
    gap-x-6
    items-start
  "
        >
          <div className="flex flex-col gap-1">
            <TeamIcons
              allies={teamMates}
              enemies={enemies}
              champions={champions}
              region={region}
            />
          </div>
          <div className="shrink-0 text-right text-sm">
            <p
              className={`
    ${getQueueColor(match.info.queueId)}
    font-medium
  `}
            >
              {getQueueName(match.info.queueId)}
            </p>

            <p className={win ? "text-emerald-400" : "text-rose-400"}>
              {win ? "Victoria" : "Derrota"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
