import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-darkBlue px-8 py-3">
      <Link className="text-white font-bold text-2xl p-3" href={"/"}>
        Escola de Surf Água Viva
      </Link>
    </nav>
  );
}
