import { NextRequest, NextResponse } from "next/server";
import { getSummonerProfile } from "@/lib/api/summoner";

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
    const profile = await getSummonerProfile(
      gameName,
      tagLine,
      region
    );

    console.log(profile);

    return NextResponse.json(profile);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Jugador no encontrado" },
      { status: 404 }
    );
  }
}