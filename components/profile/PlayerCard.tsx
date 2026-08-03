import Image from "next/image";

interface PlayerCardProps {
  gameName: string;
  tagLine: string;
  level: number;
  icon: number;
}

export default function PlayerCard({
  gameName,
  tagLine,
  level,
  icon,
}: PlayerCardProps) {
  return (
    <div
      className="
        mt-4
        flex
        w-full
        max-w-xl
        items-center
        gap-4

        rounded-xl
        border
        border-slate-700/70

        bg-linear-to-br
        from-slate-900
        via-slate-900
        to-indigo-950/60

        px-4
        py-5

        shadow-xl
        shadow-black/30

        transition-all
        duration-200

        hover:border-indigo-500/50
        hover:-translate-y-0.5

        sm:gap-5
        sm:px-6
      "
    >
      {/* Icono */}
      <div className="relative shrink-0">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/${icon}.png`}
          alt={gameName}
          width={90}
          height={90}
          className="
            h-20
            w-20
            rounded-xl
            border-2
            border-indigo-500/70

            sm:h-22.5
            sm:w-22.5
          "
        />

        {/* Nivel */}
        <div
          className="
            absolute
            -bottom-2
            left-1/2
            -translate-x-1/2

            rounded-full
            border
            border-indigo-500/70

            bg-slate-950

            px-3
            py-0.5

            text-xs
            font-bold
            text-indigo-300
          "
        >
          {level}
        </div>
      </div>

      {/* Información */}
      <div className="min-w-0 flex-1">
        <h2
          className="
            truncate
            text-2xl
            font-bold
            tracking-tight
            text-white

            sm:text-3xl
          "
        >
          {gameName}
        </h2>

        <div className="mt-3 h-px w-full max-w-40 bg-slate-700" />

        <p
          className="
            mt-1
            truncate
            text-sm
            font-medium
            text-indigo-300

            sm:text-base
          "
        >
          #{tagLine}
        </p>
      </div>
    </div>
  );
}