import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const statusIcons = {
  Pending: <ClockIcon className="h-5 w-5 text-yellow-500" />,
  Processing: <TruckIcon className="h-5 w-5 text-blue-500" />,
  Completed: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
  Cancelled: <XCircleIcon className="h-5 w-5 text-red-500" />,
};

const statusColors = {
  Pending: 'bg-yellow-900/30 text-yellow-400',
  Processing: 'bg-blue-900/30 text-blue-400',
  Completed: 'bg-green-900/30 text-green-400',
  Cancelled: 'bg-red-900/30 text-red-400',
};

export default function OrderCard({ order, onClick }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-black-800 border border-gold-500/20 rounded-xl overflow-hidden shadow-lg hover:shadow-gold transition-all duration-300 cursor-pointer"
      onClick={() => {
        setExpanded(!expanded);
        if (onClick) onClick();
      }}
    >
      <div className="px-6 py-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Order Info */}
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
              {statusIcons[order.status]}
              <span className="ml-1 capitalize">{order.status.toLowerCase()}</span>
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-gold-400">
                Order #{order.id}
              </h3>
              <p className="text-sm text-gold-500">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Price and Toggle */}
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-gold-300">Total</p>
              <p className="text-xl font-bold text-gold-500">
                ${order.total_price.toFixed(2)}
              </p>
            </div>
            <button className="text-gold-500 hover:text-gold-300">
              {expanded ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-6 py-4 border-t border-gold-500/10 bg-black-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Items */}
            <div>
              <h4 className="text-sm font-medium text-gold-400 mb-3">ITEMS</h4>
              <ul className="space-y-3">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden border border-gold-500/20">
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
                      <div className="ml-3">
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
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Summary */}
            <div>
              <h4 className="text-sm font-medium text-gold-400 mb-3">SUMMARY</h4>
              <div className="space-y-2 text-sm">
                {order.delivery_address && (
                  <div className="flex justify-between">
                    <span className="text-gold-500">Delivery Address</span>
                    <span className="text-gold-300">{order.delivery_address}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gold-500">Order Date</span>
                  <span className="text-gold-300">
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gold-500">Payment Method</span>
                  <span className="text-gold-300">Credit Card</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gold-500/10 flex justify-between">
                  <span className="font-medium text-gold-400">Total</span>
                  <span className="font-bold text-gold-500">
                    ${order.total_price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to={`/orders/${order.id}`}
                  className="inline-flex items-center text-sm font-medium text-gold-500 hover:text-gold-300"
                >
                  View full order details
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}