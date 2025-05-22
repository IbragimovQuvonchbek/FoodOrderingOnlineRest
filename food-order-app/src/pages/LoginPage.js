import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tokenData = await login(credentials);
      authLogin(tokenData);
      toast.success('Welcome to Golden Burger!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-black-800 p-10 rounded-xl shadow-lg border border-gold-500/20">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center mb-2 text-gold-400 hover:text-gold-300">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back to Home
          </Link>
          <h2 className="mt-2 text-3xl font-display font-bold text-gold-500">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gold-300">
            Enjoy your golden burger experience
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gold-300">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-black-700 border border-gold-500/30 rounded-md text-gold-300 shadow-sm focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gold-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-black-700 border border-gold-500/30 rounded-md text-gold-300 shadow-sm focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-gold-500/30 rounded bg-black-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gold-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-gold-400 hover:text-gold-300">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black-900 ${
                loading ? 'bg-gold-600' : 'gold-gradient hover:shadow-gold'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gold-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-gold-500 hover:text-gold-300">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}