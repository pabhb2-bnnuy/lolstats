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

  const value =
    PLATFORMS[region.toUpperCase()];


  if (!value) {
    throw new Error(
      `Región inválida: ${region}`
    );
  }


  return value;
}


// =========================
// ACCOUNT API
// =========================

export async function getAccountByRiotId(
  gameName: string,
  tagLine: string
) {

  const res = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
    {
      headers:{
        "X-Riot-Token":API_KEY,
      },
      cache:"no-store",
    }
  );


  if(!res.ok){

    console.log(
      "ACCOUNT ERROR",
      res.status,
      await res.text()
    );

    throw new Error(
      "Cuenta no encontrada"
    );
  }


  return res.json();
}



// =========================
// SUMMONER API
// =========================

export async function getSummonerByPuuid(
  puuid:string,
  region:string
){

  const res = await fetch(
    `https://${platform(region)}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    {
      headers:{
        "X-Riot-Token":API_KEY,
      },
      cache:"no-store",
    }
  );


  const data =
    await res.json();


  console.log(
    "SUMMONER:",
    data
  );


  if(!res.ok){
    throw new Error(
      "Summoner no encontrado"
    );
  }


  return data;
}



// =========================
// RANKED API
// =========================

export async function getRankedStats(
  puuid: string,
  region: string
){

  const url =
    `https://${platform(region)}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`;


  console.log(
    "RANK URL:",
    url
  );


  const res = await fetch(
    url,
    {
      headers:{
        "X-Riot-Token": API_KEY,
      },
      cache:"no-store",
    }
  );


  const text =
    await res.text();


  console.log(
    "RANK STATUS:",
    res.status
  );


  console.log(
    "RANK RESPONSE:",
    text
  );


  if(!res.ok){

    throw new Error(
      `Rank error ${res.status}`
    );

  }


  return JSON.parse(text);

}



// =========================
// MATCH HISTORY
// =========================


export async function getMatchIds(
  puuid:string,
  start:number = 0,
  count:number = 10
){

  const res = await fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`,
    {
      headers:{
        "X-Riot-Token":API_KEY,
      },
      cache:"no-store",
    }
  );


  if(!res.ok){

    console.log(
      "MATCH IDS ERROR:",
      res.status,
      await res.text()
    );


    throw new Error(
      "No se pudieron obtener partidas"
    );
  }


  return res.json();

}


export async function getMatch(
  matchId:string
){

  const res = await fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    {
      headers:{
        "X-Riot-Token":API_KEY,
      },
      cache:"no-store",
    }
  );


  if(!res.ok){

    throw new Error(
      "Match no encontrado"
    );
  }


  return res.json();
}