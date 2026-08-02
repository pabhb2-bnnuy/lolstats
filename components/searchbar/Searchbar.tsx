"use client";

import Image from "next/image";

import RegionSelector from "./RegionSelector";
import SearchInput from "./SearchInput";
import SearchError from "./SearchError";

import { useSearchSummoner } from "@/hooks/useSearchSummoner";

export default function Searchbar() {
  const {
    value,
    setValue,
    region,
    setRegion,
    loading,
    error,
    search,
  } = useSearchSummoner();

  return (
    <section className="flex flex-col items-center px-4 pt-32 sm:pt-36 md:pt-44 lg:pt-50">
      {/* Logo */}
      <Image
        src="/gnar_main.png"
        alt="Logo LolStats"
        width={450}
        height={300}
        priority
        className="
          mb-8
          h-auto
          w-64
          select-none
          sm:w-72
          md:w-96
          lg:w-[450px]
        "
      />

      {/* Buscador */}
      <form
        onSubmit={search}
        className="
          w-full
          max-w-[560px]
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
          <RegionSelector
            value={region}
            onChange={setRegion}
          />

          <SearchInput
            value={value}
            onChange={setValue}
            loading={loading}
          />
        </div>
      </form>

      {/* Error */}
      <div className="mt-4 w-full max-w-[560px]">
        <SearchError error={error} />
      </div>
    </section>
  );
}