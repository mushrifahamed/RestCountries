import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { fetchAllCountries } from '../utils/api';
import { ThemeProvider } from '../utils/ThemeContext';

// Mock the API module
vi.mock('../utils/api', () => ({
  fetchAllCountries: vi.fn(),
}));

test('renders countries after API call', async () => {
  const mockCountries = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      flags: { png: 'flag.png' },
      population: 331000000,
      region: 'Americas',
      capital: ['Washington, D.C.'],
    },
  ];

  fetchAllCountries.mockResolvedValue(mockCountries);

  render(
    <ThemeProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </ThemeProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('United States')).toBeInTheDocument();
  });
});