import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function Game() {
  const navigate = useNavigate();
  const {
    players,
    gameMode,
    backlog,
    currentFeatureIndex,
    currentRound,
    votes,
    completedFeatures,
    nextRound,
    completeFeature,
    saveGameToFile,
  } = useGame();

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(null);

  const cardValues = ['0', '1', '2', '3', '5', '8', '13', '21', '?', 'coffee'];

  useEffect(() => {
    if (players.length === 0) {
      navigate('/setup');
    }
  }, [players, navigate]);

  useEffect(() => {
    if (currentFeatureIndex >= backlog.length && backlog.length > 0) {
      navigate('/results');
    }
  }, [currentFeatureIndex, backlog, navigate]);


  const handleNextRound = () => {
    nextRound();
    setCurrentPlayerIndex(0);
    setShowResults(false);
    setResult(null);
  };

  const handleCompleteFeature = () => {
    completeFeature(result.value);
    setCurrentPlayerIndex(0);
    setShowResults(false);
    setResult(null);
  };

  const currentFeature = backlog[currentFeatureIndex];

  if (!currentFeature) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => {
              if (confirm('Êtes-vous sûr de vouloir quitter la partie ?')) {
                navigate('/');
              }
            }}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
          >
            ← Quitter
          </button>
          <button
            onClick={saveGameToFile}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            💾 Sauvegarder
          </button>
        </div>

        {/* Progress */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Fonctionnalité {currentFeatureIndex + 1} / {backlog.length}
            </h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Round {currentRound} • Mode: {gameMode}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedFeatures.length / backlog.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Feature */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {currentFeature.name}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {currentFeature.description}
          </p>
        </div>

        {/* Vote Results */}
        {showResults ? (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Résultats du Vote
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 text-center"
                >
                  <div className="font-semibold text-gray-800 dark:text-white mb-2">
                    {player.name}
                  </div>
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {votes[player.id]}
                  </div>
                </div>
              ))}
            </div>

            {result && (
              <div className="text-center mb-6">
                {result.consensus ? (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                    <div className="text-green-800 dark:text-green-300 font-semibold text-xl mb-2">
                      ✅ Consensus atteint !
                    </div>
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {result.value}
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                    <div className="text-yellow-800 dark:text-yellow-300 font-semibold text-xl">
                      ⚠️ Pas de consensus
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 mt-2">
                      Un nouveau tour de vote est nécessaire
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 justify-center">
              {result?.consensus ? (
                <button
                  onClick={handleCompleteFeature}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition"
                >
                  Valider et Continuer
                </button>
              ) : (
                <button
                  onClick={handleNextRound}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition"
                >
                  Nouveau Tour
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  );
}

export default Game;

