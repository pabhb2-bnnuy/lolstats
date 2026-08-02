import RankedInfo from "./RankedInfo";
import MatchHistory from "./MatchHistory";

interface RankedCardProps {
  profile: {
    tier: string;
    rank: string;
    lp: number;
    wins: number;
    losses: number;
    totalGames: number;
    matches: any[];
    puuid: string;
  };

  champions: Record<string, string>;
}

export default function RankedCard({
  profile,
  champions,
}: RankedCardProps) {
  return (
    <div
      className="
        w-full

        rounded-2xl

        border
        border-indigo-500/20

        bg-gradient-to-br
        from-slate-950
        via-indigo-950/30
        to-slate-900

        p-4
        sm:p-6

        shadow-xl
        shadow-indigo-950/40

        backdrop-blur-md

        transition
        duration-300

        hover:border-indigo-400/40
      "
    >
      <div
        className="
          grid
          grid-cols-1
          gap-8

          lg:grid-cols-12
        "
      >
        {/* Ranked */}
        <div
          className="
            lg:col-span-4

            lg:border-r
            lg:border-indigo-500/10

            lg:pr-6
          "
        >
          <RankedInfo
            profile={profile}
          />
        </div>

        {/* Historial */}
        <div
          className="
            lg:col-span-8
          "
        >
          <MatchHistory
            matches={profile.matches}
            puuid={profile.puuid}
            champions={champions}
          />
        </div>
      </div>
    </div>
  );
}