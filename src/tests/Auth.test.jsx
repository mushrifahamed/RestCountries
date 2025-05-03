/* File: ./src/tests/Auth.test.jsx */
import { render, screen } from '@testing-library/react';
import Auth from '../components/Auth';
import { ThemeProvider } from '../utils/ThemeContext';
import { AuthProvider, useAuth } from '../utils/AuthContext';

vi.mock('../utils/firebase', () => {
  const mockAuth = {
    signOut: vi.fn().mockResolvedValue(undefined),
    onAuthStateChanged: vi.fn((auth, callback) => {
      // Return unsubscribe function immediately
      return vi.fn();
    }),
  };
  return {
    auth: mockAuth,
  };
});

vi.mock('../utils/AuthContext', async () => {
  const actual = await vi.importActual('../utils/AuthContext');
  return {
    ...actual,
    useAuth: vi.fn(() => ({ user: null })), // Default mock value
  };
});

test('renders sign-in button when user is not logged in', () => {
  useAuth.mockReturnValue({ user: null });

  render(
    <ThemeProvider>
      <AuthProvider>
        <Auth />
      </AuthProvider>
    </ThemeProvider>
  );

  expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
});

test('renders user email and sign-out button when user is logged in', () => {
  useAuth.mockReturnValue({ user: { email: 'test@example.com' } });

  render(
    <ThemeProvider>
      <AuthProvider>
        <Auth />
      </AuthProvider>
    </ThemeProvider>
  );

  expect(screen.getByText('test@example.com')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sign out/i })).toBeInTheDocument();
});