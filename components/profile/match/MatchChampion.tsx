import MatchItems from "./MatchItems";
interface MatchChampionProps {
  player: any;
  playedAt: string;
  champions: Record<string, string>;
  items: number[];
  spells: string[];
  patch: string;
  spellVersion: string;
}
export default function MatchChampion({
  player,
  playedAt,
  champions,
  items,
  spells,
  patch,
  spellVersion,
}: MatchChampionProps) {
  return (
    <div className="flex items-center gap-4">
      {" "}
      {/* Campeón + Hechizos */}{" "}
      <div
        className="
    flex
    flex-col
    items-center
    gap-2
    min-w-16
  "
      >
        {" "}
        <img
          src={
            champions[player.championName.replace(/['\s]/g, "").toLowerCase()]
          }
          alt={player.championName}
          loading="lazy"
          className="h-14 w-14 rounded-xl"
        />{" "}
        <div
          className="
    flex
    justify-center
    gap-1.5
    w-full
  "
        >
          {" "}
          {spells.map((spell, index) => (
            <img
              key={index}
              src={`https://ddragon.leagueoflegends.com/cdn/${spellVersion}/img/spell/${spell}.png`}
              alt={spell}
              loading="lazy"
              className="
  h-7
  w-7
  rounded-md
  border
  border-slate-700
"
            />
          ))}{" "}
        </div>{" "}
      </div>{" "}
      {/* Información */}{" "}
      <div className="flex flex-col gap-2">
        {" "}
        <div>
          {" "}
          <p className="mb-1 text-sm font-bold text-purple-200">
            {" "}
            {playedAt}{" "}
          </p>{" "}
          <h3 className="text-lg font-bold text-white">
            {" "}
            {player.championName}{" "}
          </h3>{" "}
          <p className="text-sm font-bold">
            {" "}
            <span className="text-white">{player.kills}</span>{" "}
            <span className="text-slate-500"> / </span>{" "}
            <span className="text-rose-400">{player.deaths}</span>{" "}
            <span className="text-slate-500"> / </span>{" "}
            <span className="text-cyan-400">{player.assists}</span>{" "}
          </p>{" "}
        </div>{" "}
        <MatchItems
          items={items}
          spells={[]}
          patch={patch}
          spellVersion={spellVersion}
          trinket={player.item6}
        />{" "}
      </div>{" "}
    </div>
  );
}
