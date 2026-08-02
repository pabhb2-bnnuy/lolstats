import PlayerCard from "@/components/PlayerCard";

interface PageProps {
  params: Promise<{
    region: string;
    gameName: string;
    tagLine: string;
  }>;
}

export default async function SummonerPage({ params }: PageProps) {
  const { region, gameName, tagLine } = await params;

  return (
    <main className="">
 <PlayerCard text={""} />
    </main>
  );
}