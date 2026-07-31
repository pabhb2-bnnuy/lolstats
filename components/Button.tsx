import { ReactNode } from "react";

export default function Button({
  text,
  image,
  className = "",
}: {
  text: string;
  image?: ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`flex items-center justify-center gap-2
      border-indigo-500 border-2 rounded-md shadow-xs shadow-indigo-900
      bg-indigo-600 text-white w-10 h-9
      hover:bg-blue-800 transition duration-600
      hover:border-indigo-300 hover:animate-zoom ${className}`}
    >
      {image}

      <span>{text}</span>
    </button>
  );
}
