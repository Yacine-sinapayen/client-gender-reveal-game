import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { vi } from 'vitest';
import Register from '../pages/Register';

// Mock axios
vi.mock('axios');
const mockedAxios = axios;

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

const renderRegisterComponent = () => {
  return render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
};

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Register component with all form fields', () => {
    renderRegisterComponent();
    
    // Vérifier que tous les champs sont présents
    expect(screen.getByPlaceholderText('Nom d\'utilisateur')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmez le mot de passe')).toBeInTheDocument();
    expect(screen.getByText('Sélectionnez votre rôle')).toBeInTheDocument();
    expect(screen.getByText('S\'inscrire')).toBeInTheDocument();
  });

  it('displays validation errors when form is submitted empty', async () => {
    const user = userEvent.setup();
    renderRegisterComponent();
    
    const submitButton = screen.getByText('S\'inscrire');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Nom d\'utilisateur est requis')).toBeInTheDocument();
      expect(screen.getByText('Email est requis')).toBeInTheDocument();
      expect(screen.getByText('Le mot de passe doit contenir au moins 6 caractères')).toBeInTheDocument();
      expect(screen.getByText('Confirmation du mot de passe est requise')).toBeInTheDocument();
      expect(screen.getByText('Veuillez sélectionner un rôle')).toBeInTheDocument();
    });
  });

  it('prevents form submission with invalid email', async () => {
    const user = userEvent.setup();
    renderRegisterComponent();
    
    // Remplir tous les champs avec un email invalide
    await user.type(screen.getByPlaceholderText('Nom d\'utilisateur'), 'testuser');
    await user.type(screen.getByPlaceholderText('Email'), 'invalid-email');
    await user.selectOptions(screen.getByRole('combobox'), 'player');
    await user.type(screen.getByPlaceholderText('Mot de passe'), 'password123');
    await user.type(screen.getByPlaceholderText('Confirmez le mot de passe'), 'password123');
    
    const submitButton = screen.getByText('S\'inscrire');
    await user.click(submitButton);

    // Vérifier que l'API n'a pas été appelée (car la validation a échoué à cause e l'adresse email invalide)
    await waitFor(() => {
      expect(mockedAxios.post).not.toHaveBeenCalled();
    });
  });

  it('displays validation error for password too short', async () => {
    const user = userEvent.setup();
    renderRegisterComponent();
    
    const passwordInput = screen.getByPlaceholderText('Mot de passe');
    await user.type(passwordInput, '123');
    
    const submitButton = screen.getByText('S\'inscrire');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Le mot de passe doit contenir au moins 6 caractères')).toBeInTheDocument();
    });
  });

  it('displays validation error when passwords do not match', async () => {
    const user = userEvent.setup();
    renderRegisterComponent();
    
    const passwordInput = screen.getByPlaceholderText('Mot de passe');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirmez le mot de passe');
    
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'different123');
    
    const submitButton = screen.getByText('S\'inscrire');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Les mots de passe doivent correspondre')).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response
    mockedAxios.post.mockResolvedValueOnce({
      status: 201,
      data: { message: 'User created successfully' }
    });

    renderRegisterComponent();
    
    // Fill in the form
    await user.type(screen.getByPlaceholderText('Nom d\'utilisateur'), 'testuser');
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.selectOptions(screen.getByRole('combobox'), 'player');
    await user.type(screen.getByPlaceholderText('Mot de passe'), 'password123');
    await user.type(screen.getByPlaceholderText('Confirmez le mot de passe'), 'password123');
    
    // Submit the form
    const submitButton = screen.getByText('S\'inscrire');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          role: 'player'
        }
      );
    });
  });

  it('handles API error on registration failure', async () => {
    const user = userEvent.setup();
    
    // Mock API error
    mockedAxios.post.mockRejectedValueOnce(new Error('Registration failed'));

    renderRegisterComponent();
    
    // Fill in the form
    await user.type(screen.getByPlaceholderText('Nom d\'utilisateur'), 'testuser');
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.selectOptions(screen.getByRole('combobox'), 'player');
    await user.type(screen.getByPlaceholderText('Mot de passe'), 'password123');
    await user.type(screen.getByPlaceholderText('Confirmez le mot de passe'), 'password123');
    
    // Submit the form
    const submitButton = screen.getByText('S\'inscrire');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });

  it('toggles password visibility when checkbox is clicked', async () => {
    const user = userEvent.setup();
    renderRegisterComponent();
    
    const passwordInput = screen.getByPlaceholderText('Mot de passe');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirmez le mot de passe');
    const showPasswordCheckbox = screen.getByRole('checkbox');
    
    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    
    // Click the checkbox
    await user.click(showPasswordCheckbox);
    
    // Password should now be visible
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  it('navigates to home page after successful registration', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response
    mockedAxios.post.mockResolvedValueOnce({
      status: 201,
      data: { message: 'User created successfully' }
    });

    renderRegisterComponent();
    
    // Fill in the form
    await user.type(screen.getByPlaceholderText('Nom d\'utilisateur'), 'testuser');
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.selectOptions(screen.getByRole('combobox'), 'player');
    await user.type(screen.getByPlaceholderText('Mot de passe'), 'password123');
    await user.type(screen.getByPlaceholderText('Confirmez le mot de passe'), 'password123');
    
    // Submit the form
    const submitButton = screen.getByText('S\'inscrire');
    await user.click(submitButton);

    // Wait for navigation (with timeout)
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    }, { timeout: 3000 });
  });
});