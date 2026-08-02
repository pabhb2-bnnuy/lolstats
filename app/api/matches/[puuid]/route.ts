import {
  getMatchIds,
  getMatch,
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


  const {
    puuid,
  } = await params;



  const {
    searchParams,
  } = new URL(req.url);



  const start =
    Number(
      searchParams.get("start") ?? 0
    );



  try {


    const matchIds =
      await getMatchIds(
        puuid,
        start
      );



    const matches =
      await Promise.all(
        matchIds.map(
          (id:string)=>
            getMatch(id)
        )
      );



    return Response.json(
      matches
    );



  } catch(error) {


    console.error(
      "MATCH API ERROR:",
      error
    );


    return Response.json(
      {
        error:
          "No se pudieron cargar partidas"
      },
      {
        status:500
      }
    );

  }

}