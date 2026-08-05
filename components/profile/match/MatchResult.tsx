interface MatchResultProps {
  win: boolean;
  queueName: string;
  queueColor: string;
}

export default function MatchResult({
  win,
  queueName,
  queueColor,
}: MatchResultProps) {
  return (
    <div className="shrink-0 text-right text-sm">
      <p className={`${queueColor} font-medium`}>
        {queueName}
      </p>

      <p className={win ? "text-emerald-400" : "text-rose-400"}>
        {win ? "Victoria" : "Derrota"}
      </p>
    </div>
  );
}