export function getQueueName(queueId: number) {
  const queues: Record<number, string> = {
    // Ranked
    420: "Ranked Solo",
    440: "Ranked Flex",

    // Normales
    400: "Normal Draft",
    430: "Normal Blind",
    490: "Quickplay",

    // ARAM
    450: "ARAM",

    // Arena
    1700: "Arena",
    1710: "Arena",

    // Clash
    700: "Clash",
    710: "Ranked 5v5",
    720: "ARAM Clash",

    // Modos temporales
    1810: "Swarm",
    1900: "URF",
  };

  return queues[queueId] ?? `Partida (${queueId})`;
}

export function getQueueColor(queueId: number) {
  switch (queueId) {
    case 420:
      return "text-cyan-500";

    case 440:
      return "text-purple-400";

    case 450:
      return "text-cyan-400";

    case 400:
    case 430:
    case 490:
      return "text-green-400";

    case 1700:
    case 1710:
      return "text-orange-400";

    default:
      return "text-slate-400";
  }
}
