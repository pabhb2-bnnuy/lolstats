import { NextRequest, NextResponse } from "next/server";
import { getAccountByRiotId } from "@/lib/riot";

export async function GET(req: NextRequest) {
  const gameName = req.nextUrl.searchParams.get("gameName");
  const tagLine = req.nextUrl.searchParams.get("tagLine");

  if (!gameName || !tagLine) {
    return NextResponse.json(
      { error: "Faltan parámetros" },
      { status: 400 }
    );
  }

  try {
    const account = await getAccountByRiotId(gameName, tagLine);

    return NextResponse.json(account);
  } catch {
    return NextResponse.json(
      { error: "No encontrado" },
      { status: 404 }
    );
  }
}