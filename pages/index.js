import { Inter } from 'next/font/google';
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/fundo-mar.png')` }}>
      <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="   ">
          <h1 className="text-white text-5xl font-extralight tracking-widest">ÁGUA VIVA</h1>
          <h2 className="text-white text-xl font-extralight tracking-widest">SURF ACADEMY</h2>
      </div>
        <Link href={"/classes"} passHref>
          <p className="p-5 px-11 mt-20 bg-yellow text-darkBlue text-xl font-extralight tracking-widest rounded-xl">Iniciar Sessão</p>
        </Link>
        <h3 className="ms-12 text-white text-xs font-extralight tracking-widest">Esqueceu-se da password?</h3>
      </div>
    </main>
  );
}
