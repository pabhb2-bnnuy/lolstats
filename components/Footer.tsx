import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        mt-16
        flex
        flex-col
        items-center
        justify-center
        gap-4
        px-4
        py-6
        sm:flex-row
        sm:gap-8
        md:gap-10
        md:px-8
        lg:px-16
        bg-linear-to-r
        from-slate-950
        via-indigo-950
        to-slate-900
        bg-size-[300%_300%]
        animate-gradient
        border-t
        border-white/10
      "
    >
 

      <Link
        href="https://github.com/pabhb2-bnnuy"
        target="_blank"
        className="
          flex
          items-center
          gap-2
          transition-transform
          hover:scale-105
        "
      >
        <p
          className="
            text-sm
            text-gray-100
            break-all
            sm:text-base
          "
        >
          Pablo Hermosilla
        </p>

        <Image
          src="/github.svg"
          alt="GitHub"
          width={28}
          height={28}
          className="h-7 w-7"
        />
      </Link>
    </footer>
  );
}
