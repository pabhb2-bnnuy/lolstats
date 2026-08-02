import { REGIONS } from "./constants";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RegionSelector({ value, onChange }: Props) {
  return (
    <div className="relative flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
          <option key={region} value={region} className="bg-slate-900">
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
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
