import PlayerCard from "@/components/profile/PlayerCard";
import RankedCard from "@/components/profile/RankedCard";
import LiveGameButton from "@/components/profile/LiveGameButton";

import { getSummonerProfile } from "@/lib/api/summoner";
import { getChampions } from "@/lib/utils/championCache";

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
    decodeURIComponent(region),
  );

  const champions = await getChampions();

  return (
    <main
      className="
        pt-20
        pb-10
        px-4
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
        "
      >
<div
  className="
    flex
    flex-col
    gap-4

    sm:flex-row
    sm:items-center
  "
>
  <PlayerCard
    gameName={profile.gameName}
    tagLine={profile.tagLine}
    level={profile.level}
    icon={profile.icon}
  />
<LiveGameButton
  summonerId={profile.puuid}
  region={region}
/>
</div>

        <div className="mt-6 sm:mt-8">
          <RankedCard profile={profile} champions={champions} />
        </div>
      </div>
    </main>
  );
}
