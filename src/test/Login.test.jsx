import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login'; // Assurez-vous que le chemin est correct

const renderLoginComponent = () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login', () => {
  it('renders the Login component', () => {
    renderLoginComponent();
  });

  it('contains an email input field', () => {
    renderLoginComponent();
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Mot de passe');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('displays error messages when email and password are not provided', async () => {
    renderLoginComponent();
    fireEvent.click(screen.getByText('Se connecter'));

    await waitFor(() => {
      expect(screen.getByText('Email est requis')).toBeInTheDocument();
      expect(screen.getByText('Mot de passe requis')).toBeInTheDocument();
    });
  });

  it('displays error message on failed submission', async () => {
    renderLoginComponent();
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Se connecter'));

    await waitFor(() => {
      expect(screen.getByText('Échec de la connexion')).toBeInTheDocument();
    });
  });
});