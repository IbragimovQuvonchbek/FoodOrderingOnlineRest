import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import CartItem from '../components/cart/CartItem';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { toast } from 'react-toastify';

export default function CartPage() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        try {
          const { data } = await api.get('/cart-items/');
          setCartItems(data);
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCartItems();
    }
  }, [user]);

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/cart-items/${itemId}/`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const submitOrder = async () => {
    setSubmitting(true);
    try {
      const { data } = await api.post('/orders/');
      toast.success('Order placed successfully!');
      navigate(`/orders/${data.id}`);
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-xl font-display font-semibold text-gold-400">Please login to view your cart</h2>
        <div className="mt-4">
          <Link
            to="/login"
            className="btn-primary inline-block mr-4"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn-secondary inline-block"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  const total = cartItems.reduce(
    (sum, item) => sum + item.menu_item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gold-500 mb-8">Your Golden Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gold-300">Your cart is empty</p>
          <Link
            to="/menu"
            className="btn-primary mt-4 inline-block"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-black-700 rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gold-500/10">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                />
              ))}
            </ul>
          </div>
          <div className="mt-8 bg-black-700 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-display font-semibold text-gold-400">Order Summary</h3>
              <span className="text-2xl font-bold text-gold-500">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={submitOrder}
              disabled={submitting}
              className={`w-full py-3 px-4 rounded-lg text-lg font-bold ${
                submitting ? 'bg-gold-600' : 'gold-gradient hover:shadow-gold'
              } text-black-900 focus:outline-none`}
            >
              {submitting ? 'Placing Order...' : 'Place Golden Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}