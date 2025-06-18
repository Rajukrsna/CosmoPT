import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/userAuthContext';

export const Login: React.FC = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser(name, password);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-900 to-black flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 bg-opacity-80 shadow-xl rounded-2xl p-8 w-full max-w-md text-white space-y-6 backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-300">🚀 Login to Space Portal</h2>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Username</label>
          <input
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your space name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold shadow-md"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400">
          New user?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;