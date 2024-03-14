import { useState, useEffect } from 'react';
import { getPoints, increasePoints } from '../../utils/globals.js';
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [participatingClasses, setParticipatingClasses] = useState({});

  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await fetch(`/api/user/65f1c9891601ab21c6c281fe/classes`);
        if (!response.ok) {
          throw new Error('Erro ao carregar classes');
        }
        const data = await response.json();
        setClasses(data.classes);
      } catch (error) {
        console.error('Erro ao carregar classes:', error);
      }
    }
    fetchClasses();
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

  const handleClickParticipar = (classId) => {
    setParticipatingClasses(prevState => {
      const updatedParticipatingClasses = { ...prevState };
      updatedParticipatingClasses[classId] = !prevState[classId];
      return updatedParticipatingClasses;
    });

    if (!participatingClasses[classId]) {
      increasePoints(25);
    } else {
      increasePoints(-25);
    }
  };

  const toggleParticipantsList = (classId) => {
    setSelectedClassId(prevId => (prevId === classId ? null : classId));
  };

  function formatDateTime(date) {
    const formatedDate = format(new Date(date), "dd 'de' MMMM 'às' hh:mm a", { locale: ptBR });
    const parts = formatedDate.split(' ');
    parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
    return parts.join(' ');
  }

  return (
    <main className="items-center justify-between">
      <div className="top-0 fixed w-full">
        <Navbar />
      </div>

      <div className="my-24 mx-4 flex-grow">
        <div className='flex items-center'>
          <p className='text-5xl ps-3'>🏄🏼‍♂️</p>
          <h1 className="text-3xl text-darkBlue font-bold py-3 ps-3">Próximas Aulas:</h1>
        </div>

        <div>
          {classes.length === 0 ? (
            <p>Não existe nenhuma aula para se inscrever.</p>
          ) : (
            classes.map(e => (
              <div className="max-w-lg mx-auto my-4 bg-gray-100 rounded-xl overflow-hidden shadow-lg relative" key={e._id}>
                <div className="p-4">
                  <div className="font-bold text-xl mb-2 text-darkBlue">
                    {formatDateTime(e.date)}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold text-darkBlue">Duração: </span>{e.duration}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold text-darkBlue">Local: </span>{e.location}
                  </div>
                  {users.filter(user => user._id === e.organizer).map(u => (
                    <div className='flex items-center mb-4' key={u._id}>
                      <img className="w-8 h-8 rounded-full mr-2" src={u.photoLink} alt="Instructor" />
                      <div className="text-sm">
                        <div className="font-bold text-darkBlue">Professor</div>
                        <div className="text-darkBlue">{u.name}</div>
                      </div>
                    </div>
                  ))}
                  <div onClick={() => toggleParticipantsList(e._id)}>
                    <div className="font-bold text-darkBlue mb-2">Participantes:</div>
                    {selectedClassId === e._id ? (
                      <div>
                        {e.participants.map((participantId) => {
                          const participant = users.find(user => user._id === participantId);
                          if (participant) {
                            return (
                              <div className="flex items-center mb-2" key={participant._id}>
                                <img className="w-8 h-8 rounded-full mr-2" src={participant.photoLink} alt="Participant"/>
                                <span>{participant.name}</span>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    ) : (
                      <div className='flex'>
                        {e.participants.map((participantId) => {
                          const participant = users.find(user => user._id === participantId);
                          if (participant) {
                            return (
                              <div className="flex items-center mb-2" key={participant._id}>
                                <img className="w-8 h-8 rounded-full mr-2" src={participant.photoLink} alt="Participant"/>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </div>

                  <button onClick={() => handleClickParticipar(e._id)} className={`w-full p-2 mt-2 rounded-xl shadow-md focus:outline-none font-bold ${participatingClasses[e._id] ? 'bg-gray-400 text-white' : 'bg-yellow text-darkBlue'}`}>
                    {participatingClasses[e._id] ? 'Adicionado à Aula' : 'Participar'}
                  </button>
                </div>
                <div className="absolute top-3 right-3 p-2 bg-white rounded-xl">
                  + {e.pointsToEarn} pts
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
