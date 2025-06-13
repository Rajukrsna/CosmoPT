import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/userAuthContext';

const Register: React.FC = () => {
  const { registerUser } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(name, password);
      navigate('/login');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-black flex items-center justify-center p-4">
      <form
        onSubmit={handleRegister}
        className="bg-gray-900 bg-opacity-80 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white space-y-6 backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-300">
          🛰️ Create Your Space Account
        </h2>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Username</label>
          <input
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Choose a galactic name"
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
            placeholder="Create a secret code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold shadow-md"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
