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

  const isUnranked = !profile.tier || profile.tier === "UNRANKED";

  const tier = profile.tier.toLowerCase();

  const rankIcon = isUnranked
    ? "/unranked-emblem.png"
    : `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tier}.png`;

  return (
    <div
      className="
        flex
        flex-col
        items-center
        gap-6
        text-center

        lg:flex-row
        lg:items-center
        lg:text-left
      "
    >
      {/* ICONO */}
      <div
        className="
          flex
          h-32
          w-32
          shrink-0
          items-center
          justify-center
          overflow-hidden
        "
      >
        <img
          src={rankIcon}
          alt={isUnranked ? "Unranked" : profile.tier}
          className={
            isUnranked
              ? `
                h-28
                w-28
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
      <div
        className="
          flex
          flex-col
          items-center

          lg:items-start
        "
      >
        <h2
          className="
          text-xl
          font-black
          uppercase
        text-white
          sm:text-2xl"
        >
          {isUnranked
            ? "Unranked"
            : ["MASTER", "GRANDMASTER", "CHALLENGER"].includes(profile.tier)
              ? translateRank(profile.tier)
              : `${translateRank(profile.tier)} ${profile.rank}`}
        </h2>

        {!isUnranked && (
          <p
            className="
              text-lg
              font-semibold
              text-indigo-300

              sm:text-xl
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
          <p className="text-green-400">{profile.wins} Victorias</p>

          <p className="text-red-400">{profile.losses} Derrotas</p>

          <p className="font-bold text-white">{winrate}% Winrate</p>
        </div>
      </div>
    </div>
  );
}
