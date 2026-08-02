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

      <SearchError error={error} />
    </div>
  );
}