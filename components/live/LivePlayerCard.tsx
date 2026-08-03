import Image from "next/image";

interface Props {
  player: any;
}

export default function LivePlayerCard({
  player,
}: Props) {

  const championImage =
    player.championName
      ? `https://ddragon.leagueoflegends.com/cdn/15.15.1/img/champion/${player.championName}.png`
      : null;


  return (
    <div
      className="
      h-[92px]
      sm:h-[96px]

      rounded-xl

      border
      border-white/10

      bg-slate-950/70

      px-3
      sm:px-4

      shadow-lg

      flex
      items-center
      "
    >

      <div
        className="
        flex
        items-center

        gap-3
        sm:gap-4

        w-full
        h-full
        "
      >



        {/* CHAMPION ICON */}

        <div
          className="
          h-12
          w-12

          sm:h-16
          sm:w-16

          rounded-full

          overflow-hidden

          border
          border-white/20

          bg-indigo-900

          shrink-0
          "
        >

          {
            championImage
            ?

            <Image
              src={championImage}
              alt="Champion"
              width={64}
              height={64}
              className="
              h-full
              w-full
              object-cover
              "
            />

            :

            <div
              className="
              flex
              h-full
              w-full

              items-center
              justify-center

              text-white
              font-bold

              text-lg
              sm:text-2xl
              "
            >
              {player.riotId
                ?.charAt(0)
                ?.toUpperCase()
              }
            </div>

          }

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
            truncate

            max-w-[110px]
            sm:max-w-[170px]

            text-white

            font-bold

            text-xs
            sm:text-base
            "
          >
            {player.riotId}
          </div>


          <div
            className="
            text-xs
            sm:text-sm

            text-slate-400
            "
          >
            Nivel {player.level ?? "-"}
          </div>



          {
            player.championName && (

              <div
                className="
                hidden
                sm:block

                text-xs
                text-slate-500
                "
              >
                {player.championName}
              </div>

            )
          }




          {
            player.hidden && (

              <div
                className="
                text-xs
                text-slate-500
                "
              >
                Streamer
              </div>

            )
          }


        </div>






        {/* STATS */}

        {
          !player.hidden && (

            <div
              className="
              flex

              items-center

              gap-2
              sm:gap-4

              shrink-0
              "
            >



              {/* W / L */}

              <div
                className="
                flex
                flex-col

                text-right

                text-xs
                sm:text-sm
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

                text-xs
                sm:text-sm
                "
              >

                <span
                  className="
                  text-indigo-300
                  font-semibold
                  "
                >
                  {player.tier}
                  {" "}
                  {player.rank}
                </span>


                <span
                  className="
                  text-white
                  "
                >
                  {player.lp} LP
                </span>



                <span
                  className="
                  hidden
                  sm:block

                  mt-1

                  text-emerald-300
                  font-bold
                  "
                >
                  WR {player.wr}%
                </span>


              </div>



            </div>

          )
        }


      </div>


    </div>
  );
}