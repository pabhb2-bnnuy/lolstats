import { NextRequest, NextResponse } from "next/server";
import { getAccountByRiotId } from "@/lib/api/riot";

export async function GET(req: NextRequest) {
  const gameName = req.nextUrl.searchParams.get("gameName");
  const tagLine = req.nextUrl.searchParams.get("tagLine");
  const region = req.nextUrl.searchParams.get("region");

  if (!gameName || !tagLine || !region) {
    return NextResponse.json(
      { error: "Faltan parámetros" },
      { status: 400 }
    );
  }

  try {
    const account = await getAccountByRiotId(
      gameName,
      tagLine,
      region
    );

    return NextResponse.json(account);
  } catch (err) {
    if (err instanceof Error && err.message === "REGION_MISMATCH") {
      return NextResponse.json(
        {
          error:
            "Ese Riot ID no pertenece a la región seleccionada.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Jugador no encontrado." },
      { status: 404 }
    );
  }
}