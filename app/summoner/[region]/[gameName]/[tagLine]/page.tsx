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

    <main className="pt-20 px-6">


      <div
        className="
          mx-auto
          max-w-7xl
        "
      >


        {/* PERFIL */}

        <PlayerCard

          gameName={profile.gameName}

          tagLine={profile.tagLine}

          level={profile.level}

          icon={profile.icon}

        />



        {/* RANKED + PARTIDAS */}

        <div className="mt-8">

          <RankedCard

            profile={profile}

            champions={champions}

          />

        </div>


      </div>


    </main>

  );

}