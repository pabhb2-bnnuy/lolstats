import Button from "@/components/Button";

export default function Navbar() {
  return (
    <header>
      <nav className="flex-row gap-7">
        <Button text="Inicio" />
        <img src="" alt="lolstats_logo" />

        <Button text="theme" />
        <Button text="ES/EN" />
      </nav>
    </header>
  );
}
