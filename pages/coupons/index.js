import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchCoupons() {
      try {
        const response = await fetch(`/api/user/65f1c9891601ab21c6c281fe/myCoupons`);
        if (!response.ok) {
          throw new Error('Erro ao carregar coupons');
        }
        const data = await response.json();
        setCoupons(data.userCoupons);
      } catch (error) {
        console.error('Erro ao carregar coupons:', error);
      }
    }
    fetchCoupons();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Erro ao carregar usuários');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <main className="items-center justify-between">
      <div className="top-0 fixed w-full">
        <Navbar />
      </div>

      <div className="my-24 mx-4 flex-grow">
        <div className='flex items-center'>
          <p className='text-5xl ps-3'>🎟️</p>
          <h1 className="text-3xl text-darkBlue font-bold py-3 ps-3">Cupões disponíveis:</h1>
        </div>
        

        <div>
          {coupons.length === 0 ? (
            <p>Não existe nenhum cupão.</p>
          ) : (
            coupons.map(e => (
              <div className="max-w-lg mx-auto my-6 bg-gray-100 rounded-xl overflow-hidden shadow-lg relative" key={e._id}>
                <div className="px-4 py-4 absolute top-0 left-0 w-full">
                  <div className="h-4 bg-white rounded-xl overflow-hidden">
                    <div className="bg-yellow h-96 w-full " style={{ width: `${users.length > 0 ? (users[0].points) / e.pointsRequired * 100 : 0}%` }} />
                  </div>
                </div>
                <div className="pt-10 pb-5 px-5 pe-20">
                  <div className="font-bold text-xl mb-2 text-darkBlue">
                    <span className="font-bold text-5xl text-darkBlue">-{e.value}%</span> {e.description}
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-2 py-2 pt-4 pe-6 rounded-xl text-xs">
                  {users.filter(user => user._id === e.userId).map(u => (
                    <div className='text-right' key={u._id}>
                      <div className="text-darkBlue">
                        <span className="font-bold text-darkBlue"></span>{u.points} / 
                        <span className="font-bold text-darkBlue"></span> {e.pointsRequired} pts
                      </div>

                      <div className='pt-2'>
                        {u.points >= e.pointsRequired ? (
                          <div>
                            <p>Cupão conquistado!</p>
                            <p className='text-5xl py-2'>🥳</p>
                          </div>
                          ) : "" }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      <div className="bottom-0 fixed w-full">
        <Menu />
      </div>
    </main>
  );
}
