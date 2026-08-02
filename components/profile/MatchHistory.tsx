import LoadMoreMatches from "./LoadMoreMatches";

interface MatchHistoryProps {
  matches: any[];
  puuid: string;
  champions: Record<string, string>;
}

export default function MatchHistory({
  matches,
  puuid,
  champions,
}: MatchHistoryProps) {
  return (
    <div>
      <h2
        className="
          mb-4
          text-xl
          font-bold
          text-white
        "
      >
        Últimas partidas
      </h2>

      <LoadMoreMatches
        initialMatches={matches}
        puuid={puuid}
        champions={champions}
      />
    </div>
  );
}
