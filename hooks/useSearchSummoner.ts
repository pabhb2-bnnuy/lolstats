"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { searchSummoner } from "@/lib/api/account";

export function useSearchSummoner() {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [region, setRegion] = useState("EUW");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const [gameName, tagLine] = value.trim().split("#");

    if (!gameName || !tagLine) {
      setError("Introduce un Riot ID válido (ej: Faker#KR1).");
      return;
    }

    try {
      setLoading(true);

      await searchSummoner(gameName, tagLine, region);

      router.push(
        `/summoner/${encodeURIComponent(region)}/${encodeURIComponent(
          gameName
        )}/${encodeURIComponent(tagLine)}`
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ha ocurrido un error.");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    value,
    setValue,
    region,
    setRegion,
    loading,
    error,
    search,
  };
}