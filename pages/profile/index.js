import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import { points } from '../../utils/globals.js';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [classesData, setClassesData] = useState(null);
  const [eventsData, setEventsData] = useState(null);
  const [couponsData, setCouponsData] = useState(null);


  const fetchUserData = async () => {
    try {
      const userResponse = await fetch(`/api/user/65f1c9891601ab21c6c281fe`);
      const classesResponse = await fetch(`/api/user/65f1c9891601ab21c6c281fe/myClasses`);
      const eventsResponse = await fetch(`/api/user/65f1c9891601ab21c6c281fe/myEvents`);
      const couponsResponse = await fetch(`/api/user/65f1c9891601ab21c6c281fe/myRedeemableCoupons`);

      if (userResponse.ok && classesResponse.ok && eventsResponse.ok && couponsResponse.ok) {
        const userData = await userResponse.json();
        setUserData(userData.user);

        const classesData = await classesResponse.json();
        setClassesData(classesData);

        const eventsData = await eventsResponse.json();
        setEventsData(eventsData);

        const couponsData = await couponsResponse.json();
        setCouponsData(couponsData);
      } else {
        console.error("Error fetching user data:", userResponse.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  function formatDateTime(date) {
    const formattedDate = format(new Date(date), "dd 'de' MMMM 'às' hh:mm a", { locale: ptBR });
    const parts = formattedDate.split(' ');
    parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
    return parts.join(' ');
  }

  return (
    <main>
      <div className="top-0 fixed w-full mb-2 z-40">
        <Navbar />
      </div>
      <div className="top-20 mb-96 fixed bg-white z-40 w-full">
        {userData && (
          <div className="flex p-4 gap-4">
            <img className="rounded-3xl h-48 w-48" src={userData.photoLink} alt="User" />
            <div className="flex flex-col">
              <p className="text-3xl font-semibold pb-2">{userData.name}</p>
              <p className="font-semibold pb-1">{userData.age}</p>
              <p className="font-semibold pb-1">{userData.type}</p>
              <p className="font-semibold pb-1">{userData.level}</p>
              <div className='flex items-center justify-center py-3'>
                <p className='text-3xl'>🎯</p>
                <h1 className="text-2xl text-darkBlue font-bold ps-2">{points} Pontos</h1>
              </div>
            </div>
          </div>
        )}

      </div>
      <div className="mt-96 mb-40 ml-4 mr-4">
        <h1 className="m-3 text-3xl font-bold">🏄🏼‍♂️ As minhas aulas</h1>
        <Carousel>
          <CarouselContent className="p-4">
            {classesData && classesData.userClasses.map((userClass) => (
              <CarouselItem key={userClass._id} className="basis-1/2">
                <Card className="rounded-xl bg-gray-100 overflow-hidden p-4 h-full">
                  <CardContent>
                    <p className="mb-2 font-semibold text-lg text-darkBlue">{formatDateTime(userClass.date)}</p>
                    <p> <span className="font-semibold text-darkBlue">Duração:</span> {userClass.duration}</p>
                    <p> <span className="font-semibold text-darkBlue">Local:</span> {userClass.location}</p>
                  </CardContent>
                  <CardFooter>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <h1 className="m-3 pt-10 text-3xl font-bold">🗓️ Os meus eventos</h1>
        <Carousel>
          <CarouselContent className="p-4">
            {eventsData && eventsData.userEvents.map((userEvent) => (
              <CarouselItem key={userEvent._id} className="basis-1/2">
                <Card className="rounded-xl bg-yellow p-4 overflow-hidden h-full">
                  <CardContent>
                    <p className="font-bold text-lg mb-2 text-darkBlue">{userEvent.name}</p>
                    <p><span className="text-darkBlue font-semibold">Data:</span> {formatDateTime(userEvent.date)}</p>
                    <p><span className="text-darkBlue font-semibold">Duração:</span> {userEvent.duration}</p>
                    <p><span className="text-darkBlue font-semibold">Local:</span> {userEvent.location}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <h1 className="m-3 pt-10 text-3xl font-bold">🎟️ Os meus cupões</h1>
        <Carousel>
          <CarouselContent className="p-4 pb-4">
            {couponsData && couponsData.userRedeemableCoupons.map((userCoupon) => (
              <CarouselItem key={userCoupon._id} className="basis-1/2">
                <Card className="rounded-xl p-4 h-full">
                  <CardContent>
                    <p className="text-5xl text-darkBlue font-semibold">{userCoupon.value}<span className="text-4xl">%</span></p>
                    <p>{userCoupon.description}</p>
                    <p>{userData.points}/{userCoupon.pointsRequired}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="bottom-0 fixed w-full">
        <Menu />
      </div>
    </main>
  );
}
