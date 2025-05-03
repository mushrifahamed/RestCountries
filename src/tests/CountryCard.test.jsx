/* File: ./src/tests/CountryCard.test.jsx */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { ThemeProvider } from '../utils/ThemeContext';

const mockCountry = {
  cca3: 'USA',
  name: { common: 'United States' },
  flags: { png: 'flag.png' },
  population: 331000000,
  region: 'Americas',
  capital: ['Washington, D.C.'],
};

test('renders country card with correct details', () => {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    </ThemeProvider>
  );

  expect(screen.getByText('United States')).toBeInTheDocument();
  
  // Check for population label and value separately
  expect(screen.getByText('Population:')).toBeInTheDocument();
  expect(screen.getByText('331,000,000')).toBeInTheDocument();
  
  expect(screen.getByText('Region:')).toBeInTheDocument();
  expect(screen.getByText('Americas')).toBeInTheDocument();
  
  expect(screen.getByText('Capital:')).toBeInTheDocument();
  expect(screen.getByText('Washington, D.C.')).toBeInTheDocument();
});