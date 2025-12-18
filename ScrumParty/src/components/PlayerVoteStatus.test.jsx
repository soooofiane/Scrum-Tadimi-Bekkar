import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import PlayerVoteStatus from './PlayerVoteStatus.jsx';

const players = [
  { id: 'player-0', name: 'Alice' },
  { id: 'player-1', name: 'Bob' },
];

describe('PlayerVoteStatus', () => {
  it('shows player names', () => {
    render(
      <PlayerVoteStatus
        players={players}
        votes={{}}
        currentPlayerIndex={0}
      />
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('indicates which player has voted', () => {
    render(
      <PlayerVoteStatus
        players={players}
        votes={{ 'player-0': '5' }}
        currentPlayerIndex={1}
      />
    );

    // One player has a checkmark, the current one has an hourglass
    expect(screen.getAllByText('✅').length).toBe(1);
    expect(screen.getByText('⏳')).toBeInTheDocument();
  });
});
