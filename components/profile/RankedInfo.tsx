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

export default function RankedInfo({
  profile,
}: RankedInfoProps) {

  const winrate =
    profile.totalGames > 0
      ? Math.round(
          (profile.wins / profile.totalGames) * 100
        )
      : 0;

  const isUnranked =
    !profile.tier ||
    profile.tier === "UNRANKED";

  const tier =
    profile.tier.toLowerCase();

  const rankIcon =
    isUnranked
      ? "/unranked-emblem.png"
      : `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tier}.png`;

  return (
    <div className="flex items-center gap-6">

      {/* ICONO */}
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
          alt={
            isUnranked
              ? "Unranked"
              : profile.tier
          }
       className={
  isUnranked
    ? `
      h-30
      w-30
      object-contain
    `
    : `
      h-64
      w-64
      object-contain
      scale-[4]
    `
}
        />
      </div>

      {/* INFO */}
      <div className="flex flex-col">

        <h2
          className="
            text-3xl
            font-black
            text-white
            uppercase
          "
        >
          {isUnranked
            ? "Unranked"
            : `${translateRank(profile.tier)} ${profile.rank}`}
        </h2>

        {!isUnranked && (
          <p
            className="
              text-xl
              font-semibold
              text-indigo-300
            "
          >
            {profile.lp} LP
          </p>
        )}

        <div
          className="
            mt-4
            space-y-1
            text-sm
          "
        >
          <p className="text-green-400">
            {profile.wins} Victorias
          </p>

          <p className="text-red-400">
            {profile.losses} Derrotas
          </p>

          <p className="font-bold text-white">
            {winrate}% Winrate
          </p>
        </div>

      </div>

    </div>
  );
}