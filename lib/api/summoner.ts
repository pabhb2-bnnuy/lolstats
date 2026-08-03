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

  const account =
    await getAccountByRiotId(
      gameName,
      tagLine
    );


  console.log(
    "ACCOUNT:",
    account
  );


  // =========================
  // 2. Summoner
  // =========================

  const summoner =
    await getSummonerByPuuid(
      account.puuid,
      region
    );


  console.log(
    "SUMMONER FINAL:",
    summoner
  );



  // =========================
  // 3. Ranked
  // =========================

  const ranked =
    await getRankedStats(
      account.puuid,
      region
    );



  const soloQueue =
    ranked.find(
      (queue:any) =>
        queue.queueType === "RANKED_SOLO_5x5"
    );


  const flexQueue =
    ranked.find(
      (queue:any) =>
        queue.queueType === "RANKED_FLEX_SR"
    );



  // =========================
  // 4. Match History
  // =========================

const matchIds =
  await getMatchIds(
    account.puuid,
    0,
    5
  );

  const matches =
    (
      await Promise.all(
        matchIds.map(
          async(id:string)=>{

            try {

              return await getMatch(id);

            } catch {

              console.log(
                "MATCH FALLIDA:",
                id
              );

              return null;

            }

          }
        )
      )
    )
    .filter(Boolean);



  // =========================
  // RETURN
  // =========================

  return {


    // identidad

    gameName:
      account.gameName,


    tagLine:
      account.tagLine,



    // perfil

    level:
      summoner.summonerLevel,


    icon:
      summoner.profileIconId,


// IMPORTANTE LIVE

summonerId:
  account.puuid,

    // cuenta

    puuid:
      account.puuid,



    // ranked

    soloQueue: {

      tier:
        soloQueue?.tier ??
        "UNRANKED",

      rank:
        soloQueue?.rank ??
        "",

      lp:
        soloQueue?.leaguePoints ??
        0,

      wins:
        soloQueue?.wins ??
        0,

      losses:
        soloQueue?.losses ??
        0,

      totalGames:
        (soloQueue?.wins ?? 0) +
        (soloQueue?.losses ?? 0),

    },


    flexQueue: {

      tier:
        flexQueue?.tier ??
        "UNRANKED",

      rank:
        flexQueue?.rank ??
        "",

      lp:
        flexQueue?.leaguePoints ??
        0,

      wins:
        flexQueue?.wins ??
        0,

      losses:
        flexQueue?.losses ??
        0,

      totalGames:
        (flexQueue?.wins ?? 0) +
        (flexQueue?.losses ?? 0),

    },



    matches,


    rankedRaw:
      ranked,

  };

}