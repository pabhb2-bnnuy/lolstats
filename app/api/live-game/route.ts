import { NextResponse } from "next/server";
import { getAccountByRiotId } from "@/lib/riot-accById";

export async function GET() {
  const account = await getAccountByRiotId("tarniges", "115");

  return NextResponse.json(account);
}