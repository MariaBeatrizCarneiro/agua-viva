import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export default function Events() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [showParticipantsList, setShowParticipantsList] = useState(false);
  const [participatingEvents, setParticipatingEvents] = useState({});
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showEventDescription, setShowEventDescription] = useState({});

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`/api/user/65f1c9891601ab21c6c281fe/events`);
        if (!response.ok) {
          throw new Error('Erro ao carregar events');
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Erro ao carregar events:', error);
      }
    }
    fetchEvents();
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

  const handleClickParticipar = (eventId) => {
    setParticipatingEvents(prevState => {
      const updatedParticipatingEvents = { ...prevState };
      updatedParticipatingEvents[eventId] = !prevState[eventId];
      return updatedParticipatingEvents;
    });
  };

  const toggleParticipantsList = (eventId) => {
    setSelectedEventId(prevId => (prevId === eventId ? null : eventId));
  };

  const toggleEventDescription = (eventId) => {
    setSelectedEventId(eventId);
    setShowEventDescription(prevState => ({
      ...prevState,
      [eventId]: !prevState[eventId]
    }));
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

      <div className="my-24 mx-4 flex-grow ">
        <h1 className="text-3xl text-darkBlue font-bold py-3">Próximos Eventos:</h1>

        <div>
          {events.length === 0 ? (
            <p>Não existe nenhum evento para se inscrever.</p>
          ) : (
            events.map(e => (
              <div className="max-w-md mx-auto my-4 bg-gray-100 rounded-xl overflow-hidden shadow-lg relative" key={e._id}>
                <img className="w-full h-40" src={e.photoUrl} alt="Event Photo"/>
                <div className="p-4">
                  <div className="font-bold text-2xl mb-2 text-darkBlue" onClick={() => toggleEventDescription(e._id)} style={{ cursor: 'pointer' }}>{e.name}</div>
                  {selectedEventId === e._id && showEventDescription[e._id] && (
                    <div className="my-2 text-darkBlue">{e.description}</div>
                  )}
                  <div className="mb-2">
                    <span className="font-bold text-darkBlue">Data: </span>{formatDateTime(e.date)}
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
                    {selectedEventId === e._id ? (
                      <div>
                        {e.participants.map((participantId) => {
                          const participant = users.find(user => user._id === participantId);
                          return (
                            <div className="flex items-center mb-2" key={participant._id}>
                              <img className="w-8 h-8 rounded-full mr-2" src={participant.photoLink} alt="Participant"/>
                              <span>{participant.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    ): (
                      <div className='flex'>
                        {e.participants.map((participantId) => {
                          const participant = users.find(user => user._id === participantId);
                          return (
                            <div className="flex items-center mb-2" key={participant._id}>
                              <img className="w-8 h-8 rounded-full mr-2" src={participant.photoLink} alt="Participant"/>
                            </div>
                          );
                        })}
                      </div>
                    )
                    }
                  </div>
                  <button onClick={() => handleClickParticipar(e._id)} className={`w-full p-2 mt-2 rounded-xl shadow-md focus:outline-none font-bold ${participatingEvents[e._id] ? 'bg-gray-400 text-white' : 'bg-yellow text-darkBlue'}`}>
                    {participatingEvents[e._id] ? 'Adicionado ao evento' : 'Participar'}
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
