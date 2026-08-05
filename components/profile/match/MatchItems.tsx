interface MatchItemsProps {
  items: number[];
  spells: string[];
  patch: string;
  spellVersion: string;
  trinket: number;
}

export default function MatchItems({
  items,
  spells,
  patch,
  spellVersion,
  trinket,
}: MatchItemsProps) {
  return (
    <div className="flex items-end gap-3">
      {/* Hechizos */}
      <div className="flex flex-col gap-1">
        {spells.map((spell, index) => (
          <img
            key={index}
            src={`https://ddragon.leagueoflegends.com/cdn/${spellVersion}/img/spell/${spell}.png`}
            alt={spell}
            loading="lazy"
            className="h-8 w-8 rounded-md border border-slate-700"
          />
        ))}
      </div>

      {/* Objetos */}
      <div className="flex gap-1 justify-start">
        {items.map((itemId, index) =>
          itemId !== 0 ? (
            <img
              key={index}
              src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${itemId}.png`}
              alt={`Item ${itemId}`}
              loading="lazy"
              className="h-8 w-8 rounded-md border border-slate-700"
              onError={(e) => {
                e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/img/item/${itemId}.png`;
              }}
            />
          ) : (
            <div
              key={index}
              className="h-8 w-8 rounded-md border border-slate-700 bg-slate-800/60"
            />
          ),
        )}

        {trinket !== 0 && (
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${trinket}.png`}
            alt="Trinket"
            loading="lazy"
            className="ml-2 h-8 w-8 rounded-full border border-yellow-500/50"
            onError={(e) => {
              e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/img/item/${trinket}.png`;
            }}
          />
        )}
      </div>
    </div>
  );
}
