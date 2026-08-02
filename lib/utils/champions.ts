import { getChampions } from "./championCache";


function normalizeChampionName(name:string) {
  return name
    .toLowerCase()
    .replace(/['\s\.&]/g, "");
}


const aliases: Record<string,string> = {

  kaisa: "kaisa",

  fiddlesticks: "fiddlesticks",
  fiddlestick: "fiddlesticks",

  monkeyking: "wukong",

  nunuwillump: "nunu",

  velkoz: "velkoz",

  renata: "renataglasc",

  leesin: "leesin",

};



export async function getChampionMap(){

  return await getChampions();

}



export function getChampionIcon(
  championName:string,
  champions:Record<string,string>
){

  let key =
    normalizeChampionName(championName);


  if(aliases[key]){
    key = aliases[key];
  }


  return champions[key] ?? "";

}