export const RANK_NAMES: Record<string, string> = {
  IRON: "Hierro",
  BRONZE: "Bronce",
  SILVER: "Plata",
  GOLD: "Oro",
  PLATINUM: "Platino",
  EMERALD: "Esmeralda",
  DIAMOND: "Diamante",
  MASTER: "Maestro",
  GRANDMASTER: "Gran Maestro",
  CHALLENGER: "Retador",
  UNRANKED: "Sin Clasificar",
};

export function translateRank(rank: string) {
  return RANK_NAMES[rank.toUpperCase()] ?? rank;
}
