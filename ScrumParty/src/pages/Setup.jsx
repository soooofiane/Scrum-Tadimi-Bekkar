import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

/**
 * Configuration screen used before starting a Planning Poker session.
 *
 * Players, game mode and backlog are defined here.
 *
 * @returns {JSX.Element} Setup page.
 */
function Setup() {
  const navigate = useNavigate();
  const { setPlayers, setGameMode, setBacklog, setGameStarted } = useGame();
  
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(['', '']);
  const [selectedMode, setSelectedMode] = useState('strict');
  const [backlogInput, setBacklogInput] = useState('');

  const gameModes = [
    { value: 'strict', label: 'Strict (Unanimité)', description: 'Tous les joueurs doivent être d\'accord' },
    { value: 'average', label: 'Moyenne', description: 'Calcul de la moyenne des votes' },
    { value: 'median', label: 'Médiane', description: 'Valeur médiane des votes' },
    { value: 'absolute_majority', label: 'Majorité Absolue', description: 'Plus de 50% des votes' },
    { value: 'relative_majority', label: 'Majorité Relative', description: 'Le vote le plus fréquent' },
  ];

  /**
   * Update the number of players and resize the internal names array.
   *
   * @param {number} num - New number of players.
   */
  const handleNumPlayersChange = (num) => {
    setNumPlayers(num);
    setPlayerNames(prev => {
      const newNames = [...prev];
      while (newNames.length < num) {
        newNames.push('');
      }
      return newNames.slice(0, num);
    });
  };

  /**
   * Update the name of a player in the local state.
   *
   * @param {number} index - Index of the player in the list.
   * @param {string} name - New player name.
   */
  const handlePlayerNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  /**
   * Load a JSON backlog file from disk into the text area.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - File input change event.
   */
  const handleLoadBacklog = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setBacklogInput(JSON.stringify(data, null, 2));
        } catch (error) {
          alert('Erreur lors du chargement du fichier JSON: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  /**
   * Validate input values and start the game by populating global context.
   */
  const handleStartGame = () => {
    // Validate inputs
    if (playerNames.some(name => !name.trim())) {
      alert('Veuillez entrer un nom pour tous les joueurs');
      return;
    }

    if (!backlogInput.trim()) {
      alert('Veuillez charger un backlog');
      return;
    }

    try {
      const backlogData = JSON.parse(backlogInput);
      
      // Ensure backlog is an array
      const backlogArray = Array.isArray(backlogData) ? backlogData : [backlogData];
      
      if (backlogArray.length === 0) {
        alert('Le backlog ne peut pas être vide');
        return;
      }

      // Create players with IDs
      const playersData = playerNames.map((name, index) => ({
        id: `player-${index}`,
        name: name.trim(),
      }));

      setPlayers(playersData);
      setGameMode(selectedMode);
      setBacklog(backlogArray);
      setGameStarted(true);
      navigate('/game');
    } catch (error) {
      alert('Erreur dans le format du backlog JSON: ' + error.message);
    }
  };

  const exampleBacklog = [
    {
      name: "Authentification utilisateur",
      description: "Implémenter un système de connexion/inscription"
    },
    {
      name: "Dashboard",
      description: "Créer un tableau de bord avec les statistiques"
    },
    {
      name: "API REST",
      description: "Développer les endpoints de l'API"
    }
  ];

  /**
   * Fill the backlog field with a built‑in example.
   */
  const handleUseExample = () => {
    setBacklogInput(JSON.stringify(exampleBacklog, null, 2));
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← Retour
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Configuration de la Partie
        </h1>

        <div className="space-y-6">
          {/* Players Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              👥 Joueurs
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de joueurs
              </label>
              <input
                type="number"
                min="2"
                max="10"
                value={numPlayers}
                onChange={(e) => handleNumPlayersChange(parseInt(e.target.value) || 2)}
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playerNames.map((name, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joueur {index + 1}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                    placeholder={`Nom du joueur ${index + 1}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Game Mode Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🎯 Mode de Jeu
            </h2>
            
            <div className="space-y-3">
              {gameModes.map((mode) => (
                <label
                  key={mode.value}
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedMode === mode.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="gameMode"
                    value={mode.value}
                    checked={selectedMode === mode.value}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {mode.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {mode.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Backlog Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📋 Backlog
            </h2>
            
            <div className="mb-4 space-x-2">
              <label
                htmlFor="backlog-file-input"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer transition"
              >
                📁 Charger depuis un fichier
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleLoadBacklog}
                className="hidden"
                id="backlog-file-input"
              />
              <button
                onClick={handleUseExample}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
              >
                📝 Utiliser l'exemple
              </button>
            </div>

            <textarea
              value={backlogInput}
              onChange={(e) => setBacklogInput(e.target.value)}
              placeholder='[\n  {\n    "name": "Fonctionnalité 1",\n    "description": "Description..."\n  }\n]'
              className="w-full h-64 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="mt-2 text-sm text-gray-600">
              Format: Array JSON avec des objets contenant 'name' et 'description'
            </p>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartGame}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg"
          >
            🚀 Commencer la Partie
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setup;

