import Image from "next/image";

interface Props {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
}

export default function SearchInput({
  value,
  onChange,
  loading,
}: Props) {
  return (
    <>
      <div className="h-8 w-px bg-slate-700" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

      <button
        type="submit"
        disabled={loading}
        className="
          px-5
          transition
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
    </>
  );
}