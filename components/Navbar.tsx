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
          px-20 pt-1 pb-1
          bg-slate-950/30 backdrop-blur
        "
      >
        <div>
          <Link href="/">
            <Button text="Inicio" />
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
            <Button text="theme" />
          </Link>

          <Link href="#">
            <Button text="ES/EN" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
