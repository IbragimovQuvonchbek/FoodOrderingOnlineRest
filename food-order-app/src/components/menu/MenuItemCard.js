import { useState } from 'react';
import { PlusIcon, MinusIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function MenuItemCard({ item }) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const formatPrice = (price) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numericPrice.toFixed(2);
  };

  const addToCart = async () => {
    if (!user) {
      toast.info('Please login to add items to cart');
      return;
    }

    setIsAdding(true);
    try {
      await api.post('/cart-items/', {
        menu_item_id: item.id,
        quantity: quantity,
      });
      toast.success(`${item.title} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="card">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-black-700 flex items-center justify-center">
          <span className="text-gold-500/50">No image available</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gold-400">{item.title}</h3>
          <span className="text-lg font-bold text-gold-500">
            ${formatPrice(item.price)}
          </span>
        </div>
        <p className="text-gold-300 mt-2 line-clamp-2">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          {user && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-full bg-black-700 text-gold-500 hover:bg-gold-500 hover:text-black-900 transition-colors"
                disabled={quantity <= 1}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-gold-300">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 rounded-full bg-black-700 text-gold-500 hover:bg-gold-500 hover:text-black-900 transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          )}
          <button
            onClick={addToCart}
            disabled={isAdding || !user}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
              user
                ? 'bg-gold-500 text-black-900 hover:bg-gold-600'
                : 'bg-black-700 text-gold-500/50 cursor-not-allowed'
            } transition-colors`}
          >
            <ShoppingCartIcon className="h-4 w-4" />
            <span>{isAdding ? 'Adding...' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}