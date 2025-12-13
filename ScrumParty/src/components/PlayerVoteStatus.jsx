function PlayerVoteStatus({ players, votes, currentPlayerIndex }) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          État des Votes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {players.map((player, index) => {
            const hasVoted = votes[player.id] !== undefined;
            const isCurrent = index === currentPlayerIndex;
            
            return (
              <div
                key={player.id}
                className={`
                  p-3 rounded-lg border-2 transition
                  ${isCurrent 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : hasVoted 
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-800 truncate">
                    {player.name}
                  </span>
                  <span className="ml-2">
                    {hasVoted ? '✅' : isCurrent ? '⏳' : '⏸️'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}
  
export default PlayerVoteStatus;  