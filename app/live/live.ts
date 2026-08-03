import { getLiveGame } from "@/lib/api/riot";


export async function getLiveMatch(
  region: string,
  puuid: string
) {
  const game = await getLiveGame(
    puuid,
    region
  );

  if (!game) {
    return null;
  }

  return game;
}