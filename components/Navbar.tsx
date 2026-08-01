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
        // scrolling down
        setVisible(false);
      } else {
        // scrolling up
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
        fixed top-0 left-0 w-full z-50
        transition-transform duration-300
        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <nav
        className="
    flex justify-between items-center
    px-20 py-1
    bg-[linear-gradient(135deg,rgba(2,6,23,.88),rgba(15,23,42,.85),rgba(30,41,59,.88),rgba(30,27,75,.80))]
    bg-size-[300%_300%]
    animate-gradient
    backdrop-blur-xl
    border-b border-slate-700/40
    shadow-lg shadow-black/30
  "
      >
        <div>
          <Link href="/">
            <Button text="Inicio" className="w-30" />
          </Link>
        </div>

        <div>
          <Image
            src="/mudkip.jpg"
            alt="Logo de LolStats"
            width={200}
            height={200}
          />
        </div>

        <div className="flex gap-5">
          <Link href="">
            <Button
              text="Theme"
              className="w-25"
              image={
                <Image
                  src="/dark_mode.svg"
                  alt="theme_swap"
                  width={27}
                  height={20}
                />
              }
            />
          </Link>

          <Link href="">
            <Button
              text=""
              className="w-13 pl-2"
              image={
                <Image
                  src="/language.svg"
                  alt="language_swap"
                  width={27}
                  height={20}
                />
              }
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
