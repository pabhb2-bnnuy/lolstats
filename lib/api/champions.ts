let championMap: Record<number, string> | null = null;


export async function getChampionMap() {

  if (championMap) {
    return championMap;
  }


  const versions =
    await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    )
    .then(r=>r.json());


  const version = versions[0];


  const data =
    await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    )
    .then(r=>r.json());



  const map:Record<number,string> = {};



  Object.values(data.data).forEach(
    (champ:any)=>{

      map[Number(champ.key)] =
        champ.id;

    }
  );


  championMap = map;


  return map;

}