import { getLiveGame } from "./riot";

export async function getLiveMatch(
  region: string,
  puuid: string
) {
  return await getLiveGame(
    puuid,
    region
  );
}