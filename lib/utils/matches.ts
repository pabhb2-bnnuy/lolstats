export function getQueueName(queueId:number) {

  const queues: Record<number,string> = {

    420: "Ranked Solo",
    440: "Ranked Flex",

    400: "Normal Draft",
    430: "Normal Blind",

    450: "ARAM",

    490: "Quickplay",

    1700: "Arena",

    1710: "Arena",

    1810: "Swarm",

  };


  return queues[queueId] ?? "Partida";
}



export function getQueueColor(queueId:number) {

  if(queueId === 420)
    return "text-yellow-400";


  if(queueId === 440)
    return "text-purple-400";


  if(queueId === 450)
    return "text-cyan-400";


  if(queueId === 400 || queueId === 430)
    return "text-green-400";


  return "text-slate-400";
}