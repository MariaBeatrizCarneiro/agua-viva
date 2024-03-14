import Link from "next/link";
import { points } from '../../utils/globals.js';

export default function Navbar() {
  return (
    <nav className="bg-darkBlue px-8 py-3">
      <Link className="text-white text-md font-extralight tracking-widest py-3 w-full flex justify-between" href={"/"}>
        <p>ÁGUA VIVA SURF ACADEMY</p>
        <p>Minha pontuação: {points}</p>
      </Link>
    </nav>
  );
}
