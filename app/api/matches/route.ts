import { getMatchIds, getMatch } from "@/lib/api/riot";

export async function POST(req: Request) {
  const body = await req.json();

  const { puuid, start } = body;

  const ids = await getMatchIds(puuid, start, 10);

  const matches = await Promise.all(ids.map((id: string) => getMatch(id)));

  return Response.json({
    matches,
  });
}
