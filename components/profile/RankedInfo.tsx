import { translateRank } from "@/lib/utils/ranks";

interface RankedInfoProps {
  profile: {
    tier: string;
    rank: string;
    lp: number;
    wins: number;
    losses: number;
    totalGames: number;
  };
}

export default function RankedInfo({ profile }: RankedInfoProps) {
  const winrate =
    profile.totalGames > 0
      ? Math.round((profile.wins / profile.totalGames) * 100)
      : 0;

  const tier = profile.tier.toLowerCase();

  const rankIcon =
    profile.tier === "UNRANKED"
      ? "https://ddragon.leagueoflegends.com/cdn/15.15.1/img/profileicon/29.png"
      : `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tier}.png`;

  return (
    <div className="flex items-center gap-6">
      {/* ICONO RANK */}
      <div
        className="
          h-32
          w-32
          overflow-hidden
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        <img
          src={rankIcon}
          alt={profile.tier}
          className="
            h-64
            w-64
            object-contain
            scale-[4]
          "
        />
      </div>

      {/* INFORMACIÓN */}
      <div className="flex flex-col">
        <h2
          className="
            text-3xl
            font-black
            text-white
            uppercase
          "
        >
          {translateRank(profile.tier)}
          {profile.rank && ` ${profile.rank}`}
        </h2>

        <p
          className="
            text-xl
            font-semibold
            text-indigo-300
          "
        >
          {profile.lp} LP
        </p>

        <div
          className="
            mt-4
            space-y-1
            text-sm
          "
        >
          <p className="text-green-400">{profile.wins} Victorias</p>

          <p className="text-red-400">{profile.losses} Derrotas</p>

          <p className="font-bold text-white">{winrate}% Winrate</p>
        </div>
      </div>
    </div>
  );
}
