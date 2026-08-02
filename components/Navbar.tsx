"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        z-50
        w-full
        transition-transform
        duration-300
        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <nav
        className="
          flex
          items-center
          justify-between
          px-4
          py-2
          sm:px-6
          md:px-10
          lg:px-20
          bg-linear-to-r
          from-slate-950
          via-indigo-950
          to-slate-900
          bg-size-[300%_300%]
          animate-gradient
          border-b
          border-white/10
          shadow-md
          shadow-slate-900
        "
      >
        {/* Izquierda */}
        <div className="flex items-center">
          <Link href="/">
            <Button
              text="Inicio"
              className="w-24 sm:w-28 md:w-30 text-sm"
            />
          </Link>
        </div>

        {/* Centro */}
        <Link href="/">
<Image
  src="/lolstats_logo.png"
  alt="Logo de LolStats"
  width={200}
  height={200}
  priority
  style={{
    width: "auto",
    height: "auto",
  }}
  className="
    w-28
    sm:w-36
    md:w-44
    lg:w-[200px]
    select-none
  "
/>
        </Link>

        {/* Derecha */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          <Link href="">
            <Button
              text=""
              className="w-11 sm:w-12 md:w-14"
              image={
                <Image
                  src="/dark_mode.svg"
                  alt="Cambiar tema"
                  loading="eager"
                  width={24}
                  height={24}
                />
              }
            />
          </Link>

          <Link href="">
            <Button
              text=""
              className="w-11 sm:w-12 md:w-14"
              image={
                <Image
                  src="/language.svg"
                  alt="Cambiar idioma"
                  width={24}
                  height={24}
                />
              }
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}