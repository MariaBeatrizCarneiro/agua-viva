import Link from "next/link";
import { useRouter } from 'next/router';
import { MdSurfing } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiCalendarEventFill } from "react-icons/ri";
import { MdDiscount } from "react-icons/md";

export default function Menu() {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path;
  };


  const activePageStyle = {
    color: 'yellow',
  };

  return (
    <nav className="flex justify-between items-center bg-darkBlue px-8 py-3">
      <Link className={`flex flex-col items-center justify-center text-white text-md font-extralight tracking-widest ${isActive('/events') ? 'active' : ''}`} href={"/events"}>
        <RiCalendarEventFill size={40} style={isActive('/events') ? activePageStyle : {}} />
        <span>Eventos</span>
      </Link>
      <Link className={`flex flex-col items-center justify-center text-white text-md font-extralight tracking-widest ${isActive('/coupons') ? 'active' : ''}`} href={"/coupons"}>
        <MdDiscount size={40} style={isActive('/coupons') ? activePageStyle : {}} />
        <span>Cupões</span>
      </Link>
      <Link className={`flex flex-col items-center justify-center text-white text-md font-extralight tracking-widest ${isActive('/classes') ? 'active' : ''}`} href={"/classes"}>
        <MdSurfing size={40} style={isActive('/classes') ? activePageStyle : {}} />
        <span>Aulas</span>
      </Link>
      <Link className={`flex flex-col items-center justify-center text-white text-md font-extralight tracking-widest ${isActive('/profile') ? 'active' : ''}`} href={"/profile"}>
        <FaUserCircle size={40} style={isActive('/profile') ? activePageStyle : {}} />
        <span>Perfil</span>
      </Link>
    </nav>
  );
}
