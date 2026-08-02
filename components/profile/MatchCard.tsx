export default function MatchCard() {
  return (
    <div
      className="
        flex
        items-center
        justify-between

        rounded-lg

        border
        border-slate-700

        bg-slate-800/60

        px-5
        py-4

        transition

        hover:border-indigo-500/50
      "
    >
      <div>
        <p className="font-semibold text-green-400">
          Victory
        </p>

        <p className="text-sm text-gray-300">
          Ahri • 12 / 3 / 8
        </p>
      </div>

      <span className="text-sm text-gray-400">
        31 min
      </span>
    </div>
  );
}