export function getMatchPlayer(
  match:any,
  puuid:string
){
  return match.info.participants.find(
    (p:any)=>p.puuid === puuid
  );
}


export function getTeamPlayers(
  match:any,
  teamId:number
){
  return match.info.participants.filter(
    (p:any)=>p.teamId === teamId
  );
}


export function getEnemyPlayers(
  match:any,
  teamId:number
){
  return match.info.participants.filter(
    (p:any)=>p.teamId !== teamId
  );
}