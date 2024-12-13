import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-top-gray-brown min-h-screen">
        <Routes>
          <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/games" element={<Games />} />
              {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
            </Route>
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
