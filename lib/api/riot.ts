const API_KEY = process.env.RIOT_API_KEY!;

const PLATFORMS: Record<string, string> = {
  EUW: "euw1",
  EUNE: "eun1",
  NA: "na1",
  KR: "kr",
  JP: "jp1",
  BR: "br1",
  LAN: "la1",
  LAS: "la2",
  OCE: "oc1",
  TR: "tr1",
  RU: "ru",
};

function platform(region: string) {
  return PLATFORMS[region.toUpperCase()];
}

export async function getAccountByRiotId(
  gameName: string,
  tagLine: string
) {
  const res = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Jugador no encontrado");

  return res.json();
}

export async function getSummonerByPuuid(
  puuid: string,
  region: string
) {
  const res = await fetch(
    `https://${platform(region)}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Summoner no encontrado");

  return res.json();
}

export async function getRankedStats(
  summonerId: string,
  region: string
) {
  const res = await fetch(
    `https://${platform(region)}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return [];

  return res.json();
}