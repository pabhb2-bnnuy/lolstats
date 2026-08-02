export async function searchSummoner(
  gameName: string,
  tagLine: string,
  region: string,
) {
  const res = await fetch(
    `/api/account?gameName=${encodeURIComponent(
      gameName,
    )}&tagLine=${encodeURIComponent(
      tagLine,
    )}&region=${encodeURIComponent(region)}`,
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Ha ocurrido un error.");
  }

  return data;
}
