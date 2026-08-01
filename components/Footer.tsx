import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        flex items-center justify-center gap-10
        px-70 py-5
        bg-linear-to-r
        from-slate-950
        via-indigo-950
        to-slate-900
        bg-size-[300%_300%]
        animate-gradient
        border-t border-white/10
      "
    >
      <p className="text-gray-100 hover:animate-zoom">LolStats 2026 ©</p>

      <div className="hover:animate-zoom">
        <Link
          href="https://github.com/pabhb2-bnnuy"
          className="flex items-center gap-2"
        >
          <p className="text-gray-100">pabhb2-bnnuy</p>

          <Image src="/github.svg" alt="GitHub" width={30} height={30} />
        </Link>
      </div>
    </footer>
  );
}
