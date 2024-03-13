import { useState } from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function Classes() {
  const [participantes, setParticipantes] = useState([
    {
      nome: 'Bia',
      foto: 'https://i.pinimg.com/originals/24/b9/c7/24b9c7449f2b9bcc4f82488440b5acec.jpg',
    },
    {
      nome: 'Ana',
      foto: 'https://i.pinimg.com/originals/bb/59/dc/bb59dcd1f53f299acb5949acdfd7c4d0.jpg',
    },
    {
      nome: 'Vanessa',
      foto: 'https://i.pinimg.com/originals/16/e5/6a/16e56afc81ef2a882b4c8a195af98e2d.jpg',
    },
  ]);
  const [participando, setParticipando] = useState(false);
  const [showParticipantsList, setShowParticipantsList] = useState(false);

  const handleClickParticipar = () => {
    if (!participando) {
      const meuNome = 'Eu';
      const minhaFoto = 'https://catracalivre.com.br/wp-content/uploads/2018/08/dkn57bdwsaaqp9p.jpg';
      setParticipantes([...participantes, { nome: meuNome, foto: minhaFoto }]);
      setParticipando(true);
    } else {
      const filteredParticipantes = participantes.filter(
        participante => participante.nome !== 'Eu'
      );
      setParticipantes(filteredParticipantes);
      setParticipando(false);
    }
  };

  const toggleParticipantsList = () => {
    setShowParticipantsList(!showParticipantsList);
  };

  return (
    <main className={`items-center justify-between ${inter.className}`}>
      <h1 className="text-3xl text-darkBlue font-bold py-3">Próximas Aulas:</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg flex">
        <div className="p-4 flex-grow">
          <div className="font-bold text-xl mb-2 text-darkBlue">24 de Agosto</div>
          <div className="mb-2">
            <span className="font-bold text-darkBlue">Hora: </span>8:00 AM (2h)
          </div>
          <div className="mb-2">
            <span className="font-bold text-darkBlue">Local: </span>Praia Azul
          </div>
          <div className="flex items-center mb-4">
            <img
              className="w-8 h-8 rounded-full mr-4"
              src="https://www.angelsurfschool.com/wp-content/uploads/2018/06/kikas_angels-surf-school.jpeg"
              alt="Instructor"
            />
            <div className="text-sm">
              <div className="font-bold text-darkBlue">Professor</div>
              <div className="text-darkBlue">Rafael</div>
            </div>
          </div>
          <div onClick={toggleParticipantsList}>
            <div className="font-bold text-darkBlue mb-2">Participantes:</div>
            {showParticipantsList == true ? (
              <div>
                {participantes.map((participante, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <img className="w-8 h-8 rounded-full mr-2" src={participante.foto} alt="Participant"/>
                    <span>{participante.nome}</span>
                  </div>
                ))}
              </div>
            ):
            <div className="flex flex-wrap">
              {participantes.map((participante, index) => (
                <img key={index} className="w-8 h-8 rounded-full mr-2 cursor-pointer" src={participante.foto} alt="Participant"/>
              ))}
            </div>
            }
          </div>
          <button onClick={handleClickParticipar} className={`w-full py-2 mt-2 rounded-xl shadow-md focus:outline-none font-bold ${ participando ? 'bg-gray-400 text-white' : 'bg-yellow text-darkBlue'}`}>
            {participando ? '✓ Adicionado à Aula' : 'Participar'}
          </button>
        </div>
        <img className="w-1/2" src="https://images.pexels.com/photos/5232511/pexels-photo-5232511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Surf Lesson"/>
      </div>
    </main>
  );
}
