const API_KEY = process.env.RIOT_API_KEY!;

export async function getAccountByRiotId(
  gameName: string,
  tagLine: string
) {
  const response = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Jugador no encontrado");
  }

  return response.json();
}