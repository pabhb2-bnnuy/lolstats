import {
  getQueueName,
  getQueueColor,
} from "@/lib/utils/matches";

import {
  getChampionIcon,
} from "@/lib/utils/champions";

import {
  getMatchPlayer,
  getTeamPlayers,
  getEnemyPlayers,
} from "@/lib/utils/matchPlayers";

import TeamIcons from "./TeamIcons";


interface MatchCardProps {
  match: any;
  puuid: string;
  champions: Record<string,string>;
}
export default function MatchCard({
  match,
  puuid,
  champions,
}: MatchCardProps) {


  const player = getMatchPlayer(
    match,
    puuid
  );


  if (!player) {
    return null;
  }


  const win = player.win;



  const teamMates = getTeamPlayers(
    match,
    player.teamId
  );


  const enemies = getEnemyPlayers(
    match,
    player.teamId
  );



  return (

    <div
      className={`
        rounded-xl
        border
        p-4

        transition
        duration-300

        hover:scale-[1.02]

        ${
          win
            ? `
              border-emerald-400/40
              bg-gradient-to-br
              from-emerald-900/50
              via-slate-900
              to-indigo-950/80
            `
            :
            `
              border-rose-400/40
              bg-gradient-to-br
              from-rose-900/50
              via-slate-900
              to-indigo-950/80
            `
        }
      `}
    >


      <div
        className="
          flex
          items-center
          justify-between
          gap-6
        "
      >



        {/* TU CAMPEÓN */}
        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <img
       src={
  champions[
    player.championName
      .replace("'","")
      .replace(" ","")
      .toLowerCase()
  ]
}
            alt={player.championName}
            loading="lazy"
            className="
              h-12
              w-12
              rounded-lg
            "
          />


          <div>

            <h3
              className="
                text-lg
                font-bold
                text-white
              "
            >
              {player.championName}
            </h3>


            <p
              className="
                text-sm
                text-slate-400
              "
            >
              {player.kills}
              /
              {player.deaths}
              /
              {player.assists}
            </p>


          </div>


        </div>





        {/* EQUIPOS */}
        <div
          className="
            flex
            flex-col
            gap-1
            ml-auto
          "
        >

      <TeamIcons
  players={teamMates}
  champions={champions}
/>


     <TeamIcons
  players={enemies}
  champions={champions}
/>

        </div>






        {/* INFO PARTIDA */}
        <div
          className="
            text-right
            text-sm
            min-w-28
          "
        >

          <p
            className={`
              ${getQueueColor(match.info.queueId)}
              font-medium
            `}
          >
            {getQueueName(
              match.info.queueId
            )}
          </p>


          <p
            className={
              win
                ? "text-emerald-400"
                : "text-rose-400"
            }
          >
            {
              win
                ? "Victoria"
                : "Derrota"
            }
          </p>


        </div>



      </div>


    </div>

  );
}