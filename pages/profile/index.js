import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
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

  return (
    <main>
      <div className="top-0 fixed w-full mb-2 z-40">
        <Navbar />
      </div>
      <div className="top-20 mb-96 fixed bg-white z-40 w-full">
        {userData && (
          <div className="flex flex-row gap-4 py-1 m-4 items-center">
            <img className="rounded-2xl h-48 w-48" src={userData.photoLink} alt="User" />
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
      <div className="mt-96 mb-24">
        <h1 className="m-4 text-2xl">As minhas aulas</h1>
        <Carousel>
          <CarouselContent className="pl-0">
            {classesData && classesData.userClasses.map((userClass) => (
              <CarouselItem key={userClass._id} className="basis-1/2">
                <Card className="rounded-xl">
                  <CardContent>
                    <p>Date: {new Date(userClass.date).toLocaleDateString()}</p>
                    <p>Duration: {userClass.duration}</p>
                    <p>Location: {userClass.location}</p>
                    <p>Points to Earn: {userClass.pointsToEarn}</p>
                  </CardContent>
                  <CardFooter>
                    <p>Organizer: {userClass.organizer}</p>
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
                <Card className="rounded-xl">
                  <CardContent>
                    <p>{userEvent.name}</p>
                    <p>Date: {new Date(userEvent.date).toLocaleDateString()}</p>
                    <p>Duration: {userEvent.duration}</p>
                    <p>Location: {userEvent.location}</p>
                    <p>Points to Earn: {userEvent.pointsToEarn}</p>
                  </CardContent>
                  <CardFooter>
                    <p>Organizer: {userEvent.organizer}</p>
                  </CardFooter>
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
