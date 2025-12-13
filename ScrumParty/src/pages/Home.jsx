import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import controllerIcon from '../assets/controller.svg';
import folderIcon from '../assets/folder.svg';
import infoIcon from '../assets/info.svg';

function Home() {
  const navigate = useNavigate();
  const [loadGameFromFile, setLoadGameFromFile] = useState(null);
  const [resetGame, setResetGame] = useState(null);
  const fileInputRef = useRef(null);

  const handleStartNew = () => {
    navigate('/setup');
  };

  const handleLoadGame = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-indigo-600 mb-4">
            Planning Poker
          </h1>
          <p className="text-xl text-gray-600">
            Estimez vos fonctionnalités avec votre équipe
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <button
            onClick={handleStartNew}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 shadow-lg flex items-center justify-center gap-3 cursor-pointer"
          >
            <img
              src={controllerIcon}
              alt="Icône manette"
              className="w-6 h-6 filter invert"
            />
            Nouvelle Partie
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                ou
              </span>
            </div>
          </div>

          <input
            type="file"
            accept=".json"
            onChange={handleLoadGame}
            className="hidden"
            id="load-game-input"
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-3 cursor-pointer"
          >
            <img
              src={folderIcon}
              alt="Icône dossier"
              className="w-6 h-6 filter brightness-0 opacity-80"
            />
            Reprendre une Partie
          </button>

          <div className="mt-8 p-6 bg-indigo-50 rounded-xl">
            <h3 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
              <img
                src={infoIcon}
                alt="Icône d'information"
                className="w-5 h-5"
              />
              À propos
            </h3>
            <p className="text-sm text-indigo-800">
              Le Planning Poker est une technique d'estimation agile qui permet aux équipes
              d'estimer la complexité des fonctionnalités de manière collaborative.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Projet Planning Poker • 2025</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

