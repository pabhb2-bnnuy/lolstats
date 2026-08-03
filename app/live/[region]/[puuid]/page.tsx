import { getLiveMatch } from "../../live";


interface Props {
  params: Promise<{
    region: string;
    puuid: string;
  }>;
}

export default async function LivePage({
  params,
}: Props) {

  const {
    region,
    puuid,
  } = await params;

  const game =
    await getLiveMatch(
      region,
      puuid
    );

  if (!game) {
    return (
      <main className="mx-auto max-w-5xl p-8 text-white">
        <h1 className="text-3xl font-bold">
          El jugador ya no está en partida
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8 text-white">

      <h1
        className="
          mb-8
          text-center
          text-4xl
          font-bold
        "
      >
        Live Game
      </h1>

      <pre
        className="
          overflow-auto
          rounded-xl
          border
          border-white/10
          bg-slate-900
          p-5
          text-xs
        "
      >
        {JSON.stringify(game, null, 2)}
      </pre>

    </main>
  );

}