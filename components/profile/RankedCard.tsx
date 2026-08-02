import MatchHistory from "./MatchHistory";
import RankedInfo from "./RankedInfo";

interface RankedCardProps {
  profile: {
    tier: string;
    rank: string;
    lp: number;
    wins: number;
    losses: number;
    totalGames: number;
  };
}

export default function RankedCard({ profile }: RankedCardProps) {
  return (
    <div
      className="
        mt-6
        rounded-xl
        border
        border-slate-700
        bg-slate-900/70
        backdrop-blur-md
        p-6
        shadow-xl
        shadow-black/30
      "
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <RankedInfo profile={profile} />
        </div>

        <div className="col-span-8">
          <MatchHistory />
        </div>
      </div>
    </div>
  );
}
