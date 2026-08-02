interface RankedInfoProps {
  profile: {
    tier: string;
    rank: string;
    lp: number;
    wins: number;
    losses: number;
    totalGames: number;
  };
}

export default function RankedInfo({
  profile,
}: RankedInfoProps) {
  const winrate =
    profile.totalGames > 0
      ? Math.round((profile.wins / profile.totalGames) * 100)
      : 0;

  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={`/ranks/${profile.tier.toLowerCase()}.png`}
        alt={profile.tier}
        className="w-28 h-28 object-contain"
      />

      <h2 className="mt-3 text-2xl font-bold text-white">
        {profile.tier} {profile.rank}
      </h2>

      <p className="text-indigo-300 font-semibold">
        {profile.lp} LP
      </p>

      <div className="my-5 h-px w-full bg-slate-700" />

      <div className="space-y-1 text-sm">
        <p className="text-green-400">
          {profile.wins} Wins
        </p>

        <p className="text-red-400">
          {profile.losses} Losses
        </p>

        <p className="text-white font-semibold">
          {winrate}% Win Rate
        </p>
      </div>
    </div>
  );
}