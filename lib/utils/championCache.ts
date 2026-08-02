let championsCache: Record<string,string> | null = null;


function normalize(name:string){

  return name
    .toLowerCase()
    .replace(/['\s\.\-&]/g,"");

}



export async function getChampions(){

  if(championsCache){
    return championsCache;
  }


  const versionsResponse =
    await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json",
      {
        next:{
          revalidate:86400
        }
      }
    );


  const versions =
    await versionsResponse.json();


  const version =
    versions[0];



  const response =
    await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
      {
        next:{
          revalidate:86400
        }
      }
    );


  const data =
    await response.json();



  const map:Record<string,string> = {};



  Object.values(data.data).forEach(
    (champ:any)=>{


      // USAMOS EL NOMBRE DEL JSON
      // PERO CONVERTIDO A FORMATO RIOT

      const fileName =
        champ.name
          .replace(/[^a-zA-Z]/g,"");


      const url =
        `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${fileName}.png`;



      map[
        normalize(champ.name)
      ] = url;


      map[
        champ.key
      ] = url;


    }
  );



  championsCache = map;


  return map;

}