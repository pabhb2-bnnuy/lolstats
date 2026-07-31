import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center px-70 pt-5 pb-5 bg-slate-950 justify-center gap-10">
      <p className=" text-gray-100 hover:animate-zoom">LolStats 2026 ©</p>
      <div className="hover:animate-zoom">
        <Link
          href={"https://github.com/pabhb2-bnnuy"}
          className="flex items-center"
        >
          <p className=" text-gray-100 mr-2">pabhb2-bnnuy</p>
          <Image
            src="/github.svg"
            alt="Logo de LolStats"
            width={30}
            height={50}
          />
        </Link>
      </div>
    </footer>
  );
}
