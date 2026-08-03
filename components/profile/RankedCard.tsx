import RankedInfo from "./RankedInfo";
import MatchHistory from "./MatchHistory";

interface QueueProfile {
  tier: string;
  rank: string;
  lp: number;
  wins: number;
  losses: number;
  totalGames: number;
}

interface RankedCardProps {
  profile: {
    soloQueue: QueueProfile;
    flexQueue: QueueProfile;

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
        {/* RANKEDS */}
        <div
          className="
            lg:col-span-4

            lg:border-r
            lg:border-indigo-500/10

            lg:pr-6
          "
        >
          <h2
            className="
              mb-6
              text-xl
              font-bold
              text-white
            "
          >
            Solo/Duo
          </h2>

          <RankedInfo
            profile={profile.soloQueue}
          />

          <div
            className="
              my-8
              h-px
              w-full

              bg-gradient-to-r
              from-transparent
              via-indigo-500/20
              to-transparent
            "
          />

          <h2
            className="
              mb-6
              text-xl
              font-bold
              text-white
            "
          >
            Flex 5v5
          </h2>

          <RankedInfo
            profile={profile.flexQueue}
          />
        </div>

        {/* HISTORIAL */}
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