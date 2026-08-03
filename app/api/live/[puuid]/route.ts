import { getChampionMap } from "@/lib/api/champions";
import {
  getLiveGame,
  getLivePlayer,
} from "@/lib/api/riot";


export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      puuid: string;
    }>;
  }
) {

  try {


    const { puuid } = await params;


    const url =
      new URL(req.url);


    const region =
      url.searchParams.get("region");



    if (!region) {

      return Response.json(
        {
          live:false,
        },
        {
          status:400
        }
      );

    }




    const game =
      await getLiveGame(
        puuid,
        region
      );



    if (!game) {

      return Response.json({
        live:false,
      });

    }




    const champions =
      await getChampionMap();




    const players =
      await Promise.all(

        game.participants.map(
          async(player:any)=>{


            /*
              STREAMER MODE

              Riot manda puuid null.
              NO es bot.
            */

            if(!player.puuid){


              return {

                riotId:
                  player.riotId
                  ??
                  "Hidden",


                championId:
                  player.championId,


                championName:
                  champions[player.championId],


                profileIcon:
                  player.profileIconId,


                level:
                  null,


                tier:
                  "Streamer Mode",


                rank:
                  "",


                lp:
                  0,


                wins:
                  null,


                losses:
                  null,


                wr:
                  null,


                hidden:true,


                teamId:
                  player.teamId

              };


            }





            try {


              const info =
                await getLivePlayer(
                  player.puuid,
                  player.championId,
                  player.riotId,
                  region
                );




              return {


                ...info,


                championName:
                  champions[player.championId],


                hidden:false,


                teamId:
                  player.teamId


              };



            } catch(error){


              console.log(
                "PLAYER DATA ERROR",
                player.riotId,
                error
              );



              /*
                Si falla ranked,
                mantenemos jugador
              */


              return {


                riotId:
                  player.riotId,


                championId:
                  player.championId,


                championName:
                  champions[player.championId],


                profileIcon:
                  player.profileIconId,


                hidden:false,


                teamId:
                  player.teamId,


                tier:
                  "UNRANKED",


                rank:
                  "",


                lp:
                  0,


                wins:
                  0,


                losses:
                  0,


                wr:
                  0


              };


            }



          }

        )

      );





    return Response.json({

      live:true,


      gameId:
        game.gameId,


      gameLength:
        game.gameLength,


      players


    });



  } catch(error){


    console.error(
      "LIVE ROUTE ERROR",
      error
    );



    return Response.json(

      {
        live:false,
        error:"live_failed"
      },

      {
        status:500
      }

    );

  }

}