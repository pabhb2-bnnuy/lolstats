import PlayerCard from "@/components/profile/PlayerCard";
import RankedCard from "@/components/profile/RankedCard";

import { getSummonerProfile } from "@/lib/api/summoner";
import { getChampions } from "@/lib/utils/championCache";

interface PageProps {
  params: Promise<{
    region: string;
    gameName: string;
    tagLine: string;
  }>;
}

export default async function SummonerPage({
  params,
}: PageProps) {
  const {
    region,
    gameName,
    tagLine,
  } = await params;

  const profile =
    await getSummonerProfile(
      decodeURIComponent(gameName),
      decodeURIComponent(tagLine),
      decodeURIComponent(region)
    );

  const champions =
    await getChampions();

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
        <PlayerCard
          gameName={profile.gameName}
          tagLine={profile.tagLine}
          level={profile.level}
          icon={profile.icon}
        />

        <div className="mt-6 sm:mt-8">
          <RankedCard
            profile={profile}
            champions={champions}
          />
        </div>
      </div>
    </main>
  );
}