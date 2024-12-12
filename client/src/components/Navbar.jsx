import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trophy, GamepadIcon, LayoutDashboard, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { Button } from '../components/ui/Button';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              GenderRevealGames
            </Link>
            <div className="hidden md:flex items-center space-x-4 bg-green-500">
              <Link
                to="/"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/games"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <GamepadIcon size={20} />
                <span>Games</span>
              </Link>
              <Link
                to="/leaderboard"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <Trophy size={20} />
                <span>Leaderboard</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-1"
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