import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import { useState } from "react";

export default function Profile() {
  
  const [userData, setUserData] = useState(null);
  const [classesData, setClassesData] = useState(null);
  const [eventsData, setEventsData] = useState(null);

  const fetchUserData = async () => {
    try {
      const userResponse = await fetch(`/api/user/65f1c9891601ab21c6c281fe`);
      const classesResponse = await fetch(`/api/user/65f1c9891601ab21c6c281fe/myClasses`);
      const eventResponse = await fetch(`/api/user/65f1c9891601ab21c6c281fe/myEvents`);
  
      if (userResponse.ok && classesResponse.ok && eventResponse.ok) {
        const udata = await userResponse.json();
        setUserData(udata.user);
        const cdata = await classesResponse.json();
        setClassesData(cdata);
        const edata = await eventResponse.json();
        setEventsData(edata);
      } else {
        console.error(
          "Error fetching user data:",
          userResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="top-0 fixed w-full">

        <Navbar />
      </div>
      <div className="my-24 mx-4 flex-grow">
        <p>Página de perfil</p>
        <p>{userData && userData.name}</p>
      </div>
      <div className="bottom-0 fixed w-full">
          <Menu />
      </div>
    </main>
  );
}
