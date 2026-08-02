import MatchCard from "./MatchCard";
import { getChampionMap } from "@/lib/utils/champions";


interface MatchHistoryProps {
  matches: any[];
  puuid: string;
}


export default async function MatchHistory({
  matches,
  puuid,
}: MatchHistoryProps) {


  const champions =
    await getChampionMap();



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



      <div
        className="
          space-y-3
        "
      >

        {
          matches.map(
            (match)=>(
              
              <MatchCard
                key={
                  match.metadata.matchId
                }
                match={match}
                puuid={puuid}
                champions={champions}
              />

            )
          )
        }


      </div>


    </div>

  );
}