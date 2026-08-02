import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  image?: ReactNode;
  className?: string;
}

export default function Button({ text, image, className = "" }: ButtonProps) {
  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        h-9
        px-3
        rounded-md
        border-2
        border-indigo-500
        bg-indigo-600
        text-white
        whitespace-nowrap
        shadow-sm
        shadow-indigo-900
        transition-all
        duration-300
        hover:bg-blue-800
        hover:border-indigo-300
        hover:scale-105
        ${className}
      `}
    >
      {image}

      {text && <span>{text}</span>}
    </button>
  );
}
