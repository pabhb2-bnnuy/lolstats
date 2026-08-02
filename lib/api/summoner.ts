import {
  getAccountByRiotId,
  getRankedStats,
  getSummonerByPuuid,
} from "./riot";

export async function getSummonerProfile(
  gameName: string,
  tagLine: string,
  region: string
) {
  const account = await getAccountByRiotId(gameName, tagLine);

  const summoner = await getSummonerByPuuid(
    account.puuid,
    region
  );

  const ranked = await getRankedStats(
    summoner.id,
    region
  );

  const solo =
    ranked.find(
      (q: any) => q.queueType === "RANKED_SOLO_5x5"
    ) ?? null;

  return {
    gameName: account.gameName,
    tagLine: account.tagLine,

    level: summoner.summonerLevel,

    icon: summoner.profileIconId,

    puuid: account.puuid,

    tier: solo?.tier ?? "UNRANKED",

    rank: solo?.rank ?? "",

    lp: solo?.leaguePoints ?? 0,

    wins: solo?.wins ?? 0,

    losses: solo?.losses ?? 0,

    totalGames:
      (solo?.wins ?? 0) + (solo?.losses ?? 0),
  };
}