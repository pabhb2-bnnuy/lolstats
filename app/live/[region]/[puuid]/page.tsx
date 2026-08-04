export const dynamic = "force-dynamic";
export const revalidate = 0;

import LivePlayerCard from "@/components/live/LivePlayerCard";

interface Props {
  params: Promise<{
    region: string;
    puuid: string;
  }>;
}

export default async function LivePage({ params }: Props) {
  const { region, puuid } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/live/${puuid}?region=${region}`,
    {
      cache: "no-store",
      next: {
        revalidate: 0,
      },
    },
  );

  const data = await res.json();

  if (!data.live) {
    return (
      <main
        className="
        min-h-screen
        flex
        items-center
        justify-center
        text-white
        "
      >
        No está jugando
      </main>
    );
  }

  const blue = data.players.filter(
    (p: any) => p.teamId === 100,
  );

  const red = data.players.filter(
    (p: any) => p.teamId === 200,
  );

  return (
    <main
      className="
      mx-auto
      max-w-7xl
      mt-13

      px-4
      sm:px-6

      pt-20
      pb-4
      "
    >
      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2

        gap-4
        "
      >

        {/* BLUE TEAM */}

        <section>
          <h2
            className="
            mb-3

            text-center
            text-xl
            font-bold

            text-blue-400
            "
          >
            Equipo azul
          </h2>

          <div
            className="
            space-y-2
            "
          >
            {blue.map((player: any) => (
              <LivePlayerCard
                key={player.riotId}
                player={player}
                region={region}
              />
            ))}
          </div>
        </section>


        {/* RED TEAM */}

        <section>
          <h2
            className="
            mb-3

            text-center
            text-xl
            font-bold

            text-red-400
            "
          >
            Equipo rojo
          </h2>

          <div
            className="
            space-y-2
            "
          >
            {red.map((player: any) => (
              <LivePlayerCard
                key={player.riotId}
                player={player}
                region={region}
              />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}