import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GamepadIcon, Trophy } from 'lucide-react';
//import { Button } from '../components/ui/Button';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-top-gray-brown-light rounded-lg shadow-sm p-5 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Coucou, {user?.username}!
        </h1>
        <p className="text-gray-600">
          Prêt à découvrir si je suis un petit gars ou une petite fille ? Choisissez un jeu et montrez-moi vos talents !
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/games">
          <div className="bg-top-gray-brown-light rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <GamepadIcon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Jouer aux Jeux</h2>
                <p className="text-gray-600">Venez vous amuser et montrez-moi qui est le champion !</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/leaderboard">
          <div className="bg-top-gray-brown-light rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Classement</h2>
                <p className="text-gray-600">Voyons qui est en tête et qui a besoin d'un peu plus de pratique !</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {user?.isOrganizer && (
        <div className="mt-6">
          {/* <Button variant="primary" size="lg">
            Manage Games
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;