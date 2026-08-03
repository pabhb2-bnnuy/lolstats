import { getLiveGame } from "@/lib/api/riot";


export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      gameName: string;
    }>;
  }
) {


  const {
    gameName
  } = await params;



  const url =
    new URL(req.url);



  const region =
    url.searchParams.get(
      "region"
    );



  if(!region){

    return Response.json({
      live:false
    });

  }



  console.log(
    "LIVE ROUTE:",
    {
      gameName,
      region
    }
  );



  const game =
    await getLiveGame(
      gameName,
      region
    );



  return Response.json({

    live:
      !!game,

    game,

  });


}