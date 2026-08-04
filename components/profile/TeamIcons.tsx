import Link from "next/link";

interface Props {
  allies: any[];
  enemies: any[];
  champions: Record<string, string>;
  region: string;
}

function normalizeChampionName(name: string) {
  return name.toLowerCase().replace(/['\s\.&]/g, "");
}

const aliases: Record<string, string> = {
  kaisa: "kaisa",

  chogath: "chogath",

  fiddlesticks: "fiddlesticks",

  monkeyking: "wukong",

  nunu: "nunuwillump",
  nunuwillump: "nunuwillump",

  renata: "renataglasc",
};

export default function TeamIcons({
  allies,
  enemies,
  champions,
  region,
}: Props) {
  const renderPlayer = (p: any) => {
    let key = normalizeChampionName(p.championName);

    if (aliases[key]) {
      key = aliases[key];
    }

    const icon = champions[key];

    if (!icon) {
      console.warn("Icono no encontrado:", p.championName, "->", key);
      return null;
    }

    const hasProfile = p.riotIdGameName && p.riotIdTagline;

    const content = (
      <>
        <img
          src={icon}
          alt={p.championName}
          loading="lazy"
          className="h-5 w-5 rounded"
        />

        <span
          className="
            w-[120px]
            truncate
            text-xs
            text-slate-300
          "
        >
          {p.riotIdGameName || p.summonerName || "Jugador"}
        </span>
      </>
    );

    if (!hasProfile) {
      return (
        <div
          key={p.participantId}
          className="
            flex
            items-center
            gap-2
            py-0.5
          "
        >
          {content}
        </div>
      );
    }

    return (
      <Link
        key={p.participantId}
        href={`/summoner/${region}/${encodeURIComponent(
          p.riotIdGameName,
        )}/${encodeURIComponent(p.riotIdTagline)}`}
        className="
          flex
          items-center
          gap-2
          rounded
          py-0.5

          transition-colors

          hover:bg-white/5
        "
      >
        {content}
      </Link>
    );
  };

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-x-5
      "
    >
      <div className="flex flex-col gap-1">{allies.map(renderPlayer)}</div>

      <div className="flex flex-col gap-1">{enemies.map(renderPlayer)}</div>
    </div>
  );
}
