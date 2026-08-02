interface PageProps {
  params: Promise<{
    region: string;
    gameName: string;
    tagLine: string;
  }>;
}

export default async function SummonerPage({ params }: PageProps) {
  const { region, gameName, tagLine } = await params;

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-8 shadow-xl">
        <h1 className="text-4xl font-bold">
          {gameName}#{tagLine}
        </h1>

        <p className="mt-3 text-gray-400">
          Región: {region}
        </p>
      </div>
    </main>
  );
}