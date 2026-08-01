import Image from "next/image";

Image;

export default function Searchbar() {
  return (
    <div className="pt-30 flex flex-col items-center">
      <Image
        src="/gnar_main.png"
        alt="Logo de LolStats"
        width={450}
        height={300}
        className="mb-8"
      />
      <form className="relative w-100">
        <input
          type="text"
          placeholder="Busca un invocador..."
          className="w-full rounded-full border border-gray-300 py-3 pl-6 pr-14 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500
           bg-fuchsia-200/20 text-white text-"
        />

        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
        >
          <Image
            src="/search.svg"
            alt="Logo de LolStats"
            width={30}
            height={10}
            className="hover:animate-spin-clockwise"
          />
        </button>
      </form>
    </div>
  );
}
