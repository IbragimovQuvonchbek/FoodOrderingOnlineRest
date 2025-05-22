import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/order';
import { useAuth } from '../contexts/AuthContext';
import OrderCard from '../components/orders/OrderCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user) {
          const ordersData = await getOrders();
          setOrders(ordersData);
        }
      } catch (err) {
        setError('Failed to load orders');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-display font-semibold text-gold-400">Please login to view your orders</h2>
        <button
          onClick={() => navigate('/login')}
          className="btn-primary mt-4"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gold-500 mb-8">Golden Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gold-300">You haven't placed any orders yet</p>
          <button
            onClick={() => navigate('/menu')}
            className="btn-primary mt-4"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => navigate(`/orders/${order.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}