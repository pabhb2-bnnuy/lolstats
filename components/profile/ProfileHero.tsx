interface ProfileHeroProps {
  splash: string;
  children: React.ReactNode;
}

export default function ProfileHero({
  splash,
  children,
}: ProfileHeroProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        h-72
      "
    >
      {/* Splash */}
      <img
        src={splash}
        alt="Champion Splash"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          scale-105
        "
      />

      {/* Oscurecer ligeramente */}
      <div
        className="
          absolute
          inset-0
          bg-black/20
        "
      />

      {/* Blur + degradado inferior */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40

          backdrop-blur-sm

          bg-gradient-to-t
          from-slate-950
          via-slate-950/70
          to-transparent
        "
      />

      {/* Contenido */}
      <div
        className="
          absolute
          bottom-8
          left-8
          right-8
          z-10
        "
      >
        {children}
      </div>
    </div>
  );
}