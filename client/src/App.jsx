import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { getStoredToken } from './utils/auth';

const App = () => {
  const token = getStoredToken();

  return (
    <Routes>
      <Route element={token ? <Navigate replace to="/dashboard" /> : <Register />} path="/register" />
      <Route element={token ? <Navigate replace to="/dashboard" /> : <Login />} path="/login" />
      <Route element={<ProtectedRoute />}>
        <Route element={<Dashboard />} path="/dashboard" />
      </Route>
      <Route element={<Navigate replace to={token ? '/dashboard' : '/login'} />} path="*" />
    </Routes>
  );
};

export default App;
