import { useState } from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) return;

    setQuantity(newQuantity);
    setIsUpdating(true);
    try {
      await onUpdateQuantity(item.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <li className="px-4 py-4 sm:px-6">
      <div className="flex items-center">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
            {item.menu_item.image ? (
              <img
                src={item.menu_item.image}
                alt={item.menu_item.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xs">No image</span>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1 px-4">
            <div>
              <h3 className="text-lg font-medium text-indigo-600 truncate">
                {item.menu_item.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                {item.menu_item.description}
              </p>
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={isUpdating || quantity <= 1}
              className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isUpdating}
              className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="w-24 text-right">
            <p className="text-lg font-medium">
              ${(item.menu_item.price * quantity).toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-red-500 hover:text-red-700"
            title="Remove item"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </li>
  );
}