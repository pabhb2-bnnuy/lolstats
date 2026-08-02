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
    <div
      className={` ${className}`}
    >
      {image}

      <span>{text}</span>
    </div>
  );
}
