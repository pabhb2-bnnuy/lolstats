import {
  getAccountByRiotId,
  getRankedStats,
  getSummonerByPuuid,
  getMatchIds,
  getMatch,
} from "./riot";


export async function getSummonerProfile(
  gameName: string,
  tagLine: string,
  region: string,
) {


  // =========================
  // 1. Cuenta Riot
  // =========================

  const account = await getAccountByRiotId(
    gameName,
    tagLine
  );


  console.log(
    "ACCOUNT:",
    account
  );



  // =========================
  // 2. Perfil invocador
  // =========================

  const summoner =
    await getSummonerByPuuid(
      account.puuid,
      region
    );


  console.log(
    "SUMMONER:",
    summoner
  );



  // =========================
  // 3. Ranked
  // =========================

  let ranked:any[] = [];


ranked =
  await getRankedStats(
    account.puuid,
    region
  );



  console.log(
    "RANKED:",
    ranked
  );



  const soloQueue =
    ranked.find(
      (queue:any)=>
        queue.queueType === "RANKED_SOLO_5x5"
    );



  // =========================
  // 4. Partidas
  // =========================

  const matchIds =
    await getMatchIds(
      account.puuid
    );


  console.log(
    "MATCH IDS:",
    matchIds
  );



const matches = (
  await Promise.all(
    matchIds.map(
      async (id: string) => {
        try {
          return await getMatch(id);
        } catch (error) {
          console.log(
            "MATCH FALLIDA:",
            id
          );

          return null;
        }
      }
    )
  )
).filter(Boolean);

  console.log(
    "MATCHES:",
    matches
  );



  // =========================
  // RETURN
  // =========================

  return {


    // Identidad

    gameName:
      account.gameName,


    tagLine:
      account.tagLine,



    // Perfil

    level:
      summoner.summonerLevel,


    icon:
      summoner.profileIconId,


    puuid:
      account.puuid,



    // Ranked

    tier:
      soloQueue?.tier ?? "UNRANKED",


    rank:
      soloQueue?.rank ?? "",


    lp:
      soloQueue?.leaguePoints ?? 0,


    wins:
      soloQueue?.wins ?? 0,


    losses:
      soloQueue?.losses ?? 0,


    totalGames:
      (soloQueue?.wins ?? 0) +
      (soloQueue?.losses ?? 0),



    // Partidas

    matches,



    rankedRaw:
      ranked,
  };
}