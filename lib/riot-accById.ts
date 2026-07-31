const API_KEY = process.env.RIOT_API_KEY!;

export async function getAccountByRiotId(
  gameName: string,
  tagLine: string
) {
  const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;

  console.log("URL:", url);

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": API_KEY,
    },
  });

  console.log("Status:", response.status);

  const data = await response.json();

  console.log(data);

  return data;
}