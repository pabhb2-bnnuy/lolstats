import { timeAgo } from "@/lib/utils/timeAgo";
import { spellMap } from "@/lib/utils/summonerSpells";

import { getQueueColor, getQueueName } from "@/lib/utils/matches";
import {
  getEnemyPlayers,
  getMatchPlayer,
  getTeamPlayers,
} from "@/lib/utils/matchPlayers";

import MatchChampion from "./match/MatchChampion";
import MatchResult from "./match/MatchResult";
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

  const patch =
    match.info.gameVersion.split(".").slice(0, 2).join(".") + ".1";

  const items = [
    player.item0,
    player.item1,
    player.item2,
    player.item3,
    player.item4,
    player.item5,
  ];

  const spells = [
    spellMap[player.summoner1Id],
    spellMap[player.summoner2Id],
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

        <MatchChampion
          player={player}
          playedAt={playedAt}
          champions={champions}
          items={items}
          spells={spells}
          patch={patch}
          spellVersion={patch}
        />

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
          <TeamIcons
            allies={teamMates}
            enemies={enemies}
            champions={champions}
            region={region}
          />

          <MatchResult
            win={win}
            queueName={getQueueName(match.info.queueId)}
            queueColor={getQueueColor(match.info.queueId)}
          />
        </div>
      </div>
    </div>
  );
}