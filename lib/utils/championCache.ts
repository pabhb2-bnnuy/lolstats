let championsCache: Record<string, string> | null = null;

function normalize(name: string) {
  return name.toLowerCase().replace(/['\s\.&]/g, "");
}

export async function getChampions() {
  if (championsCache) {
    return championsCache;
  }

  const versionResponse = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json",
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  const versions = await versionResponse.json();

  const version = versions[0];

  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );

  const data = await response.json();

  const map: Record<string, string> = {};

  Object.values(data.data).forEach((champ: any) => {
    const cleanId = champ.id.replace(/^(Jade_|Original_)/, "");

    map[normalize(champ.name)] =
      `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${cleanId}.png`;
  });

  championsCache = map;

  return map;
}
