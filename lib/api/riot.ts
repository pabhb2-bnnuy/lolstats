const API_KEY = process.env.RIOT_API_KEY!;

// =========================
// LIVE CACHE
// =========================

const playerCache =
  new Map<
    string,
    {
      time:number;
      data:any;
    }
  >();


const liveCache =
  new Map<
    string,
    {
      time:number;
      data:any;
    }
  >();

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
  const value = PLATFORMS[region.toUpperCase()];

  if (!value) {
    throw new Error(`Región inválida: ${region}`);
  }

  return value;
}

// =========================
// ACCOUNT RIOT ID
// =========================

export async function getAccountByRiotId(gameName: string, tagLine: string) {
  const res = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,

    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    console.log("ACCOUNT ERROR", data);

    throw new Error("Cuenta no encontrada");
  }

  return data;
}

// =========================
// SUMMONER BY PUUID
// =========================

export async function getSummonerByPuuid(
  puuid: string,
  region: string,
) {
  const url =
    `https://${platform(region)}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;

  console.log("SUMMONER URL:", url);

  const res = await fetch(url, {
    headers: {
      "X-Riot-Token": API_KEY,
    },
    cache: "no-store",
  });

  console.log("========== HEADERS ==========");
  console.log(Object.fromEntries(res.headers.entries()));
  console.log("=============================");

  const data = await res.json();

  console.log("========== SUMMONER OBJECT ==========");
  console.dir(data, { depth: null });
  console.log("=====================================");

  if (!res.ok) {
    throw new Error("Summoner no encontrado");
  }

  return data;
}
// =========================
// SUMMONER BY NAME
// =========================

export async function getSummonerByName(name: string, region: string) {
  const url = `https://${platform(region)}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}`;

  console.log("SUMMONER NAME URL", url);

  const res = await fetch(url, {
    headers: {
      "X-Riot-Token": API_KEY,
    },
    cache: "no-store",
  });

  const text = await res.text();

  console.log("SUMMONER NAME RESPONSE", text);

  if (!res.ok) {
    throw new Error("Summoner name no encontrado");
  }

  return JSON.parse(text);
}

// =========================
// RANKED
// =========================

export async function getRankedStats(puuid: string, region: string) {
  const res = await fetch(
    `https://${platform(region)}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,

    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    console.log("RANK ERROR", data);

    throw new Error("Rank error");
  }

  return data;
}

// =========================
// MATCH IDS
// =========================

export async function getMatchIds(
  puuid: string,
  start: number = 0,
  count: number = 10,
) {
  const res = await fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`,

    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("No se pudieron cargar partidas");
  }

  return res.json();
}

// =========================
// MATCH DETAIL
// =========================

export async function getMatch(matchId: string) {
  const res = await fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,

    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Match no encontrado");
  }

  return res.json();
}

// =========================
// LIVE GAME
// =========================

export async function getLiveGame(
  puuid: string,
  region: string,
) {
  console.log("LIVE PUUID:", puuid);

  const url =
    `https://${platform(region)}.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`;

  console.log("SPECTATOR URL:", url);

  const res = await fetch(url, {
    headers: {
      "X-Riot-Token": API_KEY,
    },
    cache: "no-store",
  });

  console.log("SPECTATOR STATUS:", res.status);

  if (res.status === 404) {
    console.log("NO ESTÁ EN PARTIDA");
    return null;
  }

  const text = await res.text();

  console.log("SPECTATOR RESPONSE:");
  console.log(text);

  if (!res.ok) {
    return null;
  }

  return JSON.parse(text);
}

// =========================
// LIVE PLAYER DATA
// =========================

export async function getLivePlayer(
  puuid: string,
  championId: number,
  riotId: string,
  region: string,
) {

  const summoner =
    await getSummonerByPuuid(
      puuid,
      region
    );

  const ranked =
    await getRankedStats(
      puuid,
      region
    );

  const solo =
    ranked.find(
      (q: any) =>
        q.queueType === "RANKED_SOLO_5x5"
    );

  const wins =
    solo?.wins ?? 0;

  const losses =
    solo?.losses ?? 0;

  const total =
    wins + losses;

  return {

    riotId,

    championId,

    profileIcon:
      summoner.profileIconId,

    level:
      summoner.summonerLevel,

    tier:
      solo?.tier ?? "UNRANKED",

    rank:
      solo?.rank ?? "",

    lp:
      solo?.leaguePoints ?? 0,

    wins,

    losses,

    wr:
      total
        ? Number(
            (
              wins /
              total *
              100
            ).toFixed(1)
          )
        : 0,

  };

}