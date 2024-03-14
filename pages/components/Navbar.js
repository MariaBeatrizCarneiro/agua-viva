import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center bg-darkBlue px-8 py-3">
      <Link className="text-white text-md font-extralight tracking-widest py-3" href={"/"}>
        ÁGUA VIVA SURF ACADEMY
      </Link>
    </nav>
  );
}
