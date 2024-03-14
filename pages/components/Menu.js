import Link from "next/link";
import { MdSurfing } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiCalendarEventFill } from "react-icons/ri";
import { MdDiscount } from "react-icons/md";

export default function Menu() {
  return (
    <nav className="flex justify-between font-extralight items-center bg-darkBlue px-8 py-3">
      <Link className="text-white p-2" href={"/events"}>
        <RiCalendarEventFill size={40}/>
        Eventos
      </Link>
      <Link className="text-white p-2" href={"/coupons"}>
        <MdDiscount size={40}/>
        Cupões
      </Link>
      <Link className="text-white p-2" href={"/classes"}>
        <MdSurfing size={40}/>
        Aulas
      </Link>
      <Link className="text-white p-2" href={"/profile"}>
        <FaUserCircle size={40}/>
        Perfil
      </Link>
    </nav>
  );
}
