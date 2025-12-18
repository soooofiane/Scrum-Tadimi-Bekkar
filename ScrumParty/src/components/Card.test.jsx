import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import Card from './Card.jsx';

describe('Card', () => {
  it('renders the card value', () => {
    render(<Card value="5" onClick={() => {}} />);

    expect(screen.getByRole('button', { name: /vote for 5/i })).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();

    render(<Card value="3" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button', { name: /vote for 3/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
