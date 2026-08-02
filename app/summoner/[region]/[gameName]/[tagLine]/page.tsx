import PlayerCard from "@/components/profile/PlayerCard";
import RankedCard from "@/components/profile/RankedCard";

import { getSummonerProfile } from "@/lib/api/summoner";

interface PageProps {
  params: Promise<{
    region: string;
    gameName: string;
    tagLine: string;
  }>;
}

export default async function SummonerPage({ params }: PageProps) {
  const { region, gameName, tagLine } = await params;

  const profile = await getSummonerProfile(
    decodeURIComponent(gameName),
    decodeURIComponent(tagLine),
    decodeURIComponent(region)
  );

  return (
    <main className="pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <PlayerCard
          gameName={profile.gameName}
          tagLine={profile.tagLine}
          level={profile.level}
          icon={profile.icon}
        />

        <div className="mt-8">
          <RankedCard profile={profile} />
        </div>
      </div>
    </main>
  );
}