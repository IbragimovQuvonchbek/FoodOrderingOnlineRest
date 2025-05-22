import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import { toast } from 'react-toastify';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (formData.password !== formData.password2) {
      setErrors({ password2: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      }
      toast.error('Registration failed. Please try again.');
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
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gold-300">
            Join the Golden Burger experience
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
                className={`mt-1 block w-full px-3 py-2 bg-black-700 border ${
                  errors.username ? 'border-red-500' : 'border-gold-500/30'
                } rounded-md text-gold-300 shadow-sm focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm`}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gold-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`mt-1 block w-full px-3 py-2 bg-black-700 border ${
                  errors.email ? 'border-red-500' : 'border-gold-500/30'
                } rounded-md text-gold-300 shadow-sm focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
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
                className={`mt-1 block w-full px-3 py-2 bg-black-700 border ${
                  errors.password ? 'border-red-500' : 'border-gold-500/30'
                } rounded-md text-gold-300 shadow-sm focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gold-300">
                Confirm Password
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                required
                className={`mt-1 block w-full px-3 py-2 bg-black-700 border ${
                  errors.password2 ? 'border-red-500' : 'border-gold-500/30'
                } rounded-md text-gold-300 shadow-sm focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm`}
                value={formData.password2}
                onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
              />
              {errors.password2 && (
                <p className="mt-1 text-sm text-red-500">{errors.password2}</p>
              )}
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
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gold-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-gold-500 hover:text-gold-300">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}