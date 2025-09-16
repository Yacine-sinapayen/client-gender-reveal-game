import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trophy, GamepadIcon, LayoutDashboard, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import Button from './ui/Button';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {location.pathname !== '/login' && location.pathname !== '/register' && (
            <Link to="/" className="text-xl text-marron-chaud font-semibold">
              Accueil
            </Link>
            )}
            {user && (
              <h2 className="text-xl text-marron-chaud font-semibold">Salut {user?.username ?? "La team"}</h2>
            )}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-1 text-gradient-rose-bleu text-gradient-rose-bleu-hover transition-all duration-300"
              >
                <LayoutDashboard size={20} className="text-gradient-rose-bleu" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/games"
                className="flex items-center space-x-1 text-gradient-rose-bleu text-gradient-rose-bleu-hover transition-all duration-300"
              >
                <GamepadIcon size={20} className="text-gradient-rose-bleu" />
                <span>Games</span>
              </Link>
              <Link
                to="/leaderboard"
                className="flex items-center space-x-1 text-gradient-rose-bleu text-gradient-rose-bleu-hover transition-all duration-300"
              >
                <Trophy size={20} className="text-gradient-rose-bleu" />
                <span>Leaderboard</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
                <>
                  <Button
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                  </Button>
                </>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;