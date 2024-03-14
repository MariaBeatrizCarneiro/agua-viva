import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
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
      const couponsResponse = await fetch(`/api/user/65f1c9891601ab21c6c281fe/myCoupons`);

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
      <div className="top-16 mb-96 fixed bg-white z-40 w-full">
        {userData && (
          <div className="flex flex-row gap-4 py-1 m-4 items-center">
            <img className="rounded-3xl h-48 w-48" src={userData.photoLink} alt="User" />
            <div className="flex flex-col gap-2">
              <p className="text-2xl">{userData.name}</p>
              <p>{userData.age}</p>
              <p>{userData.type}</p>
              <p>{userData.level}</p>
            </div>
          </div>
        )}
        {userData && (
          <div>
            <p className="py-2 ml-4 mb-2 text-3xl font-bold text-darkBlue bg-white">{userData.points} Pontos</p>
          </div>
        )}
      </div>
      <div className="mt-96 mb-24 ml-4 mr-4">
        <h1 className="m-3 text-2xl font-normal">As minhas aulas</h1>
        <Carousel>
          <CarouselContent className="pl-0">
            {classesData && classesData.userClasses.map((userClass) => (
              <CarouselItem key={userClass._id} className="basis-1/2">
                <Card className="rounded-xl bg-gray-100 overflow-hidden p-2 h-44">
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
        <h1 className="m-4 text-2xl">Os meus eventos</h1>
        <Carousel>
          <CarouselContent className="pl-0">
            {eventsData && eventsData.userEvents.map((userEvent) => (
              <CarouselItem key={userEvent._id} className="basis-1/2">
                <Card className="rounded-xl bg-yellow p-2 overflow-hidden h-64">
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
        <h1 className="m-4 text-2xl">Os meus cupões</h1>
        <Carousel>
          <CarouselContent className="pl-0">
            {couponsData && couponsData.userCoupons.map((userCoupon) => (
              <CarouselItem key={userCoupon._id} className="basis-1/2">
                <Card className="rounded-xl">
                  <CardContent>
                    <p>Description: {userCoupon.description}</p>
                    <p>Value: {userCoupon.value}</p>
                    <p>Points Required: {userCoupon.pointsRequired}</p>
                    <p>Redeemed: {userCoupon.redeemed ? "Yes" : "No"}</p>
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
