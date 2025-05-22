import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-black-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden gold-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-black-900 mb-6">
            GOLDEN BURGER
          </h1>
          <p className="text-xl text-black-800 max-w-2xl mx-auto">
            Premium burgers crafted with the finest ingredients and a golden touch
          </p>
          <div className="mt-10">
            <Link
              to="/menu"
              className="btn-primary inline-flex items-center px-8 py-3 text-lg"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card p-6 text-center">
            <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-display font-bold text-gold-500 mb-2">Premium Quality</h3>
            <p className="text-gold-300">Only the finest ingredients with 24k gold leaf options</p>
          </div>

          {/* Feature 2 */}
          <div className="card p-6 text-center">
            <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-display font-bold text-gold-500 mb-2">Fast Delivery</h3>
            <p className="text-gold-300">Golden standard delivery within 30 minutes or it's free</p>
          </div>

          {/* Feature 3 */}
          <div className="card p-6 text-center">
            <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-display font-bold text-gold-500 mb-2">Certified Excellence</h3>
            <p className="text-gold-300">Award-winning recipes with golden standard certification</p>
          </div>
        </div>
      </div>
    </div>
  );
}