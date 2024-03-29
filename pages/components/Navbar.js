import Link from "next/link";
import { points } from '../../utils/globals.js';

export default function Navbar() {
  return (
    <nav className="bg-darkBlue px-8 py-3">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="text-white text-md font-extralight tracking-widest py-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="60 -10 10 100" width="50px" height="40px" fill="white">
              <title>summer_icons_expanded</title>
              <path d="M88.33,53.47a.94.94,0,0,1-1,.84c-9.86-.77-23.49,10.49-31.82.72-5.48-6.42-2.39-15,4-19.18C50.24,33.7,42,39.61,34.82,45a85.31,85.31,0,0,1-21.9,12.27c-1.36.5-1.94-1.67-.59-2.17,10.14-3.76,17.89-9.94,26.69-16,6.9-4.71,15.07-7.88,23.3-4.83a1.14,1.14,0,0,1,.27,2l-.52.4a1,1,0,0,1-.4.36l-.18.11c-4.44,3.83-7,10.65-2,15.35,3.33,3.15,7.92,2.19,11.83,1,5.45-1.64,10.82-4.19,16.5-2A1.21,1.21,0,0,1,88.33,53.47Z"/>
            </svg>
            <div>
              <p className="ps-3 text-sm">ÁGUA VIVA</p>
              <p className="ps-3 text-sm">SURF ACADEMY</p> 
            </div>
          </div>
        </Link>
        <p className="text-white text-xs font-extralight tracking-widest py-3">Meus pontos: {points}</p>
      </div>
    </nav>
  );
}
