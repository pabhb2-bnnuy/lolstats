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
  const { puuid } = await params;

  const url = new URL(req.url);

  const start = Number(
    url.searchParams.get("start") ?? "0"
  );

  const count = Number(
    url.searchParams.get("count") ?? "10"
  );

  try {
    const matchIds = await getMatchIds(
      puuid,
      start,
      count
    );

    const matches = (
      await Promise.all(
        matchIds.map(async (id: string) => {
          try {
            return await getMatch(id);
          } catch (err) {
            console.log(
              "MATCH ERROR:",
              id,
              err
            );
            return null;
          }
        })
      )
    ).filter(Boolean);

   return Response.json(matches);

  } catch (err) {

    console.log(
      "MATCHES API ERROR:",
      err
    );

 return Response.json([], {
  status: 500,
});

  }
}