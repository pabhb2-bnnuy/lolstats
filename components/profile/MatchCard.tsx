import { getQueueName, getQueueColor } from "@/lib/utils/matches";

interface MatchCardProps {
  match: any;
  puuid: string;
}

export default function MatchCard({
  match,
  puuid,
}: MatchCardProps) {

  const player =
    match.info.participants.find(
      (p: any) => p.puuid === puuid
    );

  if (!player) return null;


  const win = player.win;


  const allies =
    match.info.participants.filter(
      (p: any) =>
        p.teamId === player.teamId
    );


  const enemies =
    match.info.participants.filter(
      (p: any) =>
        p.teamId !== player.teamId
    );


  const championIcon = (name: string) =>
    `https://ddragon.leagueoflegends.com/cdn/15.15.1/img/champion/${name}.png`;


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
            : `
              border-rose-400/40
              bg-gradient-to-br
              from-rose-900/50
              via-slate-900
              to-indigo-950/80
            `
        }
      `}
    >

      <div className="flex items-center gap-4">


        {/* ICONOS EQUIPO */}
        <div className="flex flex-col gap-1">

          <div className="flex gap-1">
            {allies.map((champ: any) => (
              <img
                key={champ.participantId}
                src={championIcon(champ.championName)}
                className="
                  h-6
                  w-6
                  rounded
                  object-cover
                "
                alt=""
              />
            ))}
          </div>


          <div className="flex gap-1">
            {enemies.map((champ: any) => (
              <img
                key={champ.participantId}
                src={championIcon(champ.championName)}
                className="
                  h-6
                  w-6
                  rounded
                  object-cover
                  opacity-70
                "
                alt=""
              />
            ))}
          </div>

        </div>



        {/* DATOS DEL PLAYER */}
        <div className="flex-1">

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



        {/* INFO PARTIDA */}
        <div
          className="
            text-right
            text-sm
          "
        >

          <p
            className={`
              ${getQueueColor(match.info.queueId)}
              font-medium
            `}
          >
            {getQueueName(match.info.queueId)}
          </p>


        </div>


      </div>

    </div>
  );
}