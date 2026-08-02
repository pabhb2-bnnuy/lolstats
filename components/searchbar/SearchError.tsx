interface Props {
  error: string;
}

export default function SearchError({ error }: Props) {
  if (!error) return null;

  return (
    <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 animate-pulse">
      <span>⚠️</span>
      <span>{error}</span>
    </div>
  );
}