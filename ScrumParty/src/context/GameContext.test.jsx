import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { GameProvider, useGame } from './GameContext.jsx';

function ShowInitialState() {
  const { gameMode, players, backlog, completedFeatures } = useGame();

  return (
    <div>
      <span data-testid="game-mode">{gameMode}</span>
      <span data-testid="players-count">{players.length}</span>
      <span data-testid="backlog-count">{backlog.length}</span>
      <span data-testid="completed-count">{completedFeatures.length}</span>
    </div>
  );
}

describe('GameContext', () => {
  it('provides initial game state via useGame', () => {
    render(
      <GameProvider>
        <ShowInitialState />
      </GameProvider>
    );

    expect(screen.getByTestId('game-mode')).toHaveTextContent('strict');
    expect(screen.getByTestId('players-count')).toHaveTextContent('0');
    expect(screen.getByTestId('backlog-count')).toHaveTextContent('0');
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0');
  });
});
