import Image from "next/image";

interface Props {
  player: any;
}

export default function LivePlayerCard({
  player,
}: Props) {
  // Cambia aquí cuando Riot saque un parche nuevo
  const DDRAGON_VERSION = "16.15.1";

  const championImage = player.championName
    ? `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${encodeURIComponent(
        player.championName,
      )}.png`
    : null;

  return (
    <div
      className="
      h-[96px]
      rounded-xl
      border
      border-white/10
      bg-slate-950/70
      px-4
      shadow-lg
      flex
      items-center
      "
    >
      <div
        className="
        flex
        items-center
        gap-4
        w-full
        h-full
        "
      >
        {/* CHAMPION ICON */}

        <div
          className="
          h-16
          w-16
          rounded-full
          overflow-hidden
          border
          border-white/20
          bg-indigo-900
          shrink-0
          "
        >
          {championImage ? (
            <Image
              src={championImage}
              alt={player.championName ?? "Champion"}
              width={64}
              height={64}
              className="
              h-full
              w-full
              object-cover
              "
              unoptimized
            />
          ) : (
            <div
              className="
              flex
              h-full
              w-full
              items-center
              justify-center
              text-white
              font-bold
              text-2xl
              "
            >
              {player.riotId?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>

        {/* PLAYER INFO */}

        <div
          className="
          flex-1
          min-w-0
          "
        >
          <div
            className="
        
            text-white
            font-bold
            text-base
            "
          >
            {player.riotId}
          </div>

          <div
            className="
            text-sm
            text-slate-400
            "
          >
            Nivel {player.level ?? "-"}
          </div>

          {player.championName && (
            <div
              className="
              text-sm
              text-slate-500
              "
            >
              {player.championName}
            </div>
          )}

          {player.hidden && (
            <div
              className="
              text-sm
              text-slate-500
              "
            >
              Modo streamer
            </div>
          )}
        </div>

        {/* STATS */}

        {!player.hidden && (
          <div
            className="
            flex
            items-center
            gap-4
            shrink-0
            "
          >
            {/* W/L */}

            <div
              className="
              flex
              flex-col
              text-right
              text-sm
              "
            >
              <span
                className="
                text-emerald-400
                font-bold
                "
              >
                {player.wins}W
              </span>

              <span
                className="
                text-red-400
                font-bold
                "
              >
                {player.losses}L
              </span>
            </div>

            {/* RANK */}

            <div
              className="
              flex
              flex-col
              text-right
              "
            >
              <span
                className="
                text-indigo-300
                font-semibold
                text-sm
                "
              >
                {player.tier} {player.rank}
              </span>

              <span
                className="
                text-white
                text-sm
                "
              >
                {player.lp} LP
              </span>

              <span
                className="
                mt-1
                text-emerald-300
                font-bold
                text-sm
                "
              >
                WR {player.wr}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}