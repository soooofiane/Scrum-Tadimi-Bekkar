import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import App from './App.jsx';

describe('App', () => {
  it('renders the Planning Poker home page', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /planning poker/i })
    ).toBeInTheDocument();
  });
});
