import { getChampionIcon } from "@/lib/utils/champions";


interface Props{
 players:any[];
 champions:Record<string,string>;
}


export default function TeamIcons({
 players,
 champions
}:Props){


return (

<div className="flex gap-1">

{
players.map((p)=>(

<img

key={p.participantId}

src={
 getChampionIcon(
  p.championName,
  champions
 )
}

alt={p.championName}

loading="lazy"

className="
h-5
w-5
rounded
"

/>

))
}

</div>

);

}