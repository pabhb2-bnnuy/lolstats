import { getChampionMap } from "@/lib/api/champions";
import { getLiveGame, getLivePlayer } from "@/lib/api/riot";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      puuid: string;
    }>;
  },
) {
  try {
    const { puuid } = await params;

    const url = new URL(req.url);

    const region = url.searchParams.get("region");

    if (!region) {
      return Response.json({
        live: false,
      });
    }

    const game = await getLiveGame(puuid, region);

    if (!game) {
      return Response.json({
        live: false,
      });
    }

    const champions = await getChampionMap();

    const players = await Promise.all(
      game.participants.map(async (player: any) => {
        if (!player.puuid) {
          return {
            riotId: player.riotId,

            championId: player.championId,

            championName: champions[player.championId],

            hidden: true,

            teamId: player.teamId,
          };
        }

        try {
          const info = await getLivePlayer(
            player.puuid,
            player.championId,
            player.riotId,
            region,
          );

          return {
            ...info,

            championName: champions[player.championId],

            teamId: player.teamId,

            hidden: false,
          };
        } catch {
          return {
            riotId: player.riotId,

            championId: player.championId,

            championName: champions[player.championId],

            hidden: true,

            teamId: player.teamId,
          };
        }
      }),
    );

    return Response.json({
      live: true,

      gameId: game.gameId,

      gameLength: game.gameLength,

      players,
    });
  } catch (error) {
    console.error("LIVE API ERROR", error);

    return Response.json(
      {
        live: false,
        error: "live_failed",
      },

      {
        status: 500,
      },
    );
  }
}
