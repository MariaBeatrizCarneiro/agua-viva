import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

export default function Coupons() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="top-0 fixed w-full">
        <Navbar />
      </div>
      <div className="my-24 mx-4 flex-grow">
        <p>Página de cupões</p>
      </div>
      <div className="bottom-0 fixed w-full">
          <Menu />
      </div>
    </main>
  );
}
