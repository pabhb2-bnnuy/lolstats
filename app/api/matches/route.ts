import {
  getMatchIds,
  getMatch,
} from "@/lib/api/riot";


export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();


    const {
      puuid,
      start = 0,
    } = body;



    if (!puuid) {

      return Response.json(
        {
          error:
            "Falta puuid",
        },
        {
          status:400,
        }
      );

    }



    const ids =
      await getMatchIds(
        puuid,
        start,
        10
      );



    const matches =
      (
        await Promise.all(
          ids.map(
            async (id:string)=>{

              try {

                return await getMatch(id);

              } catch {

                console.log(
                  "MATCH FALLIDA:",
                  id
                );

                return null;

              }

            }
          )
        )
      )
      .filter(Boolean);



    return Response.json(
      matches
    );


  } catch(error) {


    console.error(
      "LOAD MATCHES ERROR:",
      error
    );


    return Response.json(
      {
        error:
          "No se pudieron cargar partidas",
      },
      {
        status:500,
      }
    );

  }

}