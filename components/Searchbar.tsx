"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const REGIONS = [
  "EUW",
  "EUNE",
  "NA",
  "KR",
  "JP",
  "BR",
  "LAN",
  "LAS",
  "OCE",
  "TR",
  "RU",
];

export default function Searchbar() {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [region, setRegion] = useState("EUW");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const [gameName, tagLine] = value.split("#");

    if (!gameName || !tagLine) {
      setError("Introduce un Riot ID válido (ej: Faker#KR1).");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/api/account?gameName=${encodeURIComponent(
          gameName,
        )}&tagLine=${encodeURIComponent(
          tagLine,
        )}&region=${encodeURIComponent(region)}`,
      );

      const text = await res.text();

      if (!res.ok) {
        console.error(text);
        setError("No hemos encontrado ese invocador.");
        return;
      }

      const data = JSON.parse(text);

      console.log(data);

      // Si existe el jugador, navegar al perfil
      router.push(
        `/summoner/${encodeURIComponent(region)}/${encodeURIComponent(
          gameName,
        )}/${encodeURIComponent(tagLine)}`,
      );
    } catch (err) {
      console.error(err);
      setError("Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-50 flex flex-col items-center">
      <Image
        src="/gnar_main.png"
        alt="Logo LolStats"
        width={450}
        height={300}
        className="mb-8 select-none"
      />

      <form
        onSubmit={search}
        className="
          w-[560px]
          rounded-full
          bg-gradient-to-r
          from-slate-700
          via-indigo-600
          to-fuchsia-600
          bg-[length:300%_300%]
          animate-gradient
          p-[2px]
          shadow-xl
          shadow-indigo-900/40
        "
      >
        <div className="flex items-center rounded-full bg-slate-900/95">
          {/* Región */}
          <div className="relative flex items-center">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="
                appearance-none
                bg-transparent
                px-5
                py-3
                pr-9
                text-sm
                font-semibold
                text-white
                outline-none
                cursor-pointer
                transition
                hover:text-indigo-300
              "
            >
              {REGIONS.map((region) => (
                <option
                  key={region}
                  value={region}
                  className="bg-slate-900 text-white"
                >
                  {region}
                </option>
              ))}
            </select>

            <svg
              className="pointer-events-none absolute right-3 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <div className="h-8 w-px bg-slate-700" />

          {/* Input */}
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Faker#KR1"
            className="
              flex-1
              bg-transparent
              px-5
              py-3
              text-lg
              text-white
              placeholder:text-gray-400
              outline-none
            "
          />

          {/* Buscar */}
          <button
            type="submit"
            disabled={loading}
            className="
              px-5
              transition
              duration-300
              hover:scale-110
              disabled:opacity-50
            "
          >
            <Image
              src="/search.svg"
              alt="Buscar"
              width={22}
              height={22}
              className={`invert ${loading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </form>

      {error && (
        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-red-500/30
            bg-red-500/10
            px-4
            py-2
            text-sm
            text-red-300
          "
        >
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
