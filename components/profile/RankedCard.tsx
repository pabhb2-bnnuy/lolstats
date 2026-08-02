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

    puuid: string;
    matches: any[];
  };
}

export default function RankedCard({
  profile,
}: RankedCardProps) {
  return (
    <div
      className="
        w-full

        rounded-2xl

        border
        border-indigo-500/20

        bg-linear-to-br
        from-slate-950
        via-indigo-950/30
        to-slate-900

        p-6

        shadow-xl
        shadow-indigo-950/40

        backdrop-blur-md
      "
    >

      <div
        className="
          grid
          grid-cols-12
          gap-8
        "
      >

        {/* Ranked */}
        <div
          className="
            col-span-12
            lg:col-span-4

            border-r
            border-indigo-500/10

            pr-6
          "
        >
          <RankedInfo profile={profile}/>
        </div>


        {/* Matches */}
        <div
          className="
            col-span-12
            lg:col-span-8
          "
        >
          <MatchHistory
            matches={profile.matches}
            puuid={profile.puuid}
          />
        </div>

      </div>

    </div>
  );
}