interface Props {
  players: any[];
  champions: Record<string, string>;
}


function normalizeChampionName(name: string) {
  return name
    .toLowerCase()
    .replace(/['\s\.&]/g, "");
}


const aliases: Record<string,string> = {

  kaisa: "kaisa",

  chogath: "chogath",

  fiddlesticks: "fiddlesticks",

  monkeyking: "wukong",

  nunu: "nunuwillump",
  nunuwillump: "nunuwillump",

  renata: "renataglasc",

};


export default function TeamIcons({
  players,
  champions,
}: Props) {


  return (

    <div className="flex gap-1">

      {
        players.map((p:any)=>{


          let key =
            normalizeChampionName(
              p.championName
            );


          if(aliases[key]){
            key = aliases[key];
          }


          const icon =
            champions[key];



          if(!icon){
            console.warn(
              "Icono no encontrado:",
              p.championName,
              "->",
              key
            );

            return null;
          }



          return (

            <img

              key={p.participantId}

              src={icon}

              alt={p.championName}

              loading="lazy"

              className="
                h-5
                w-5
                rounded
              "

            />

          );


        })
      }


    </div>

  );

}