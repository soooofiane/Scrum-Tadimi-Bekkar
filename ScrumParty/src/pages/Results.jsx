import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function Results() {
  const navigate = useNavigate();
  const { completedFeatures, gameMode, exportResults, resetGame } = useGame();

  const handleExport = () => {
    exportResults();
  };

  const handleNewGame = () => {
    resetGame();
    navigate('/setup');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🎉 Partie Terminée !
          </h1>
          <p className="text-xl text-gray-600">
            Toutes les fonctionnalités ont été estimées
          </p>
        </div>

        {/* Summary */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600">
                {completedFeatures.length}
              </div>
              <div className="text-gray-600">
                Fonctionnalités estimées
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">
                {completedFeatures.reduce((sum, f) => sum + (parseFloat(f.estimatedDifficulty) || 0), 0)}
              </div>
              <div className="text-gray-600">
                Points totaux
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800">
                {gameMode}
              </div>
              <div className="text-gray-600">
                Mode de jeu
              </div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Détail des Estimations
          </h2>
          
          <div className="space-y-4">
            {completedFeatures.map((feature, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-3xl font-bold text-indigo-600">
                      {feature.estimatedDifficulty}
                    </div>
                    <div className="text-xs text-gray-500">
                      points
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleExport}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg"
          >
            📥 Exporter les Résultats (JSON)
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleNewGame}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              🎮 Nouvelle Partie
            </button>
            <button
              onClick={handleHome}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
            >
              🏠 Retour à l'Accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;

