const API_KEY = process.env.RIOT_API_KEY!;

const ACCOUNT_HOSTS: Record<string, string> = {
  EUW: "europe.api.riotgames.com",
  EUNE: "europe.api.riotgames.com",
  TR: "europe.api.riotgames.com",
  RU: "europe.api.riotgames.com",

  NA: "americas.api.riotgames.com",
  BR: "americas.api.riotgames.com",
  LAN: "americas.api.riotgames.com",
  LAS: "americas.api.riotgames.com",

  KR: "asia.api.riotgames.com",
  JP: "asia.api.riotgames.com",

  OCE: "sea.api.riotgames.com",
};

const PLATFORM_HOSTS: Record<string, string> = {
  EUW: "euw1.api.riotgames.com",
  EUNE: "eun1.api.riotgames.com",
  NA: "na1.api.riotgames.com",
  KR: "kr.api.riotgames.com",
  JP: "jp1.api.riotgames.com",
  BR: "br1.api.riotgames.com",
  LAN: "la1.api.riotgames.com",
  LAS: "la2.api.riotgames.com",
  OCE: "oc1.api.riotgames.com",
  TR: "tr1.api.riotgames.com",
  RU: "ru.api.riotgames.com",
};

export async function getAccountByRiotId(
  gameName: string,
  tagLine: string,
  region: string
) {
  const accountHost = ACCOUNT_HOSTS[region];
  const platformHost = PLATFORM_HOSTS[region];

  if (!accountHost || !platformHost) {
    throw new Error("Región inválida");
  }

  // Buscar la cuenta Riot
  const accountResponse = await fetch(
    `https://${accountHost}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
      cache: "no-store",
    }
  );

  if (!accountResponse.ok) {
    throw new Error("Jugador no encontrado");
  }

  const account = await accountResponse.json();

  // Comprobar que existe en el servidor seleccionado
  const summonerResponse = await fetch(
    `https://${platformHost}/lol/summoner/v4/summoners/by-puuid/${account.puuid}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
      cache: "no-store",
    }
  );

  if (!summonerResponse.ok) {
    throw new Error("REGION_MISMATCH");
  }

  return account;
}