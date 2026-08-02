import MatchCard from "./MatchCard";


interface MatchHistoryProps {
  matches: any[];
  puuid: string;
}


export default function MatchHistory({
  matches,
  puuid,
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


      <div className="space-y-3">

        {matches.map(
          (match) => (

            <MatchCard
              key={
                match.metadata.matchId
              }
              match={match}
              puuid={puuid}
            />

          )
        )}

      </div>

    </div>
  );
}