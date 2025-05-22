import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function OrderDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}/`);
        setOrder(data);
      } catch (err) {
        setError('Failed to load order details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrder();
    }
  }, [id, user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gold-400">Please login to view order details</h2>
        <Link
          to="/login"
          className="btn-primary mt-4 inline-block"
        >
          Login
        </Link>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!order) return <div className="text-center py-8 text-gold-300">Order not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/orders"
        className="flex items-center text-gold-400 hover:text-gold-300 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to Orders
      </Link>

      <div className="bg-black-700 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gold-500/10">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-display font-bold text-gold-400">
                Order #{order.id}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Completed' ? 'bg-green-900 text-green-300' :
                order.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gold-300">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-display font-semibold text-gold-400 mb-4">
                Customer Information
              </h3>
              <div className="space-y-2 text-gold-300">
                <p><span className="font-medium">Name:</span> {user.username}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
                {order.delivery_address && (
                  <>
                    <p><span className="font-medium">Address:</span> {order.delivery_address}</p>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-display font-semibold text-gold-400 mb-4">
                Order Items
              </h3>
              <ul className="divide-y divide-gold-500/10">
                {order.items.map((item) => (
                  <li key={item.id} className="py-3">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                          {item.menu_item.image ? (
                            <img
                              src={item.menu_item.image}
                              alt={item.menu_item.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-black-600 flex items-center justify-center">
                              <span className="text-xs text-gold-500/50">No image</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gold-300">
                            {item.menu_item.title}
                          </p>
                          <p className="text-sm text-gold-500">
                            {item.quantity} × ${item.menu_item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gold-400">
                        ${(item.quantity * item.menu_item.price).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gold-500/10">
                <div className="flex justify-between">
                  <p className="text-lg font-display font-semibold text-gold-400">Total</p>
                  <p className="text-xl font-bold text-gold-500">
                    ${order.total_price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}