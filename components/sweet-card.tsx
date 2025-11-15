'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

export function SweetCard({
  sweet,
  onPurchase,
}: {
  sweet: Sweet;
  onPurchase: (id: string, qty: number) => void;
}) {
  const [qty, setQty] = useState(1);

  return (
    <motion.div
      className="group relative bg-surface/80 backdrop-blur border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image placeholder with gradient */}
      <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          {sweet.image || '🍬'}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-primary font-medium mb-1">{sweet.category}</p>
          <h3 className="font-bold text-text text-balance">{sweet.name}</h3>
          <p className="text-sm text-text-muted mt-1">{sweet.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-accent">${sweet.price.toFixed(2)}</p>
          <p className={`text-sm font-medium ${sweet.quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
          </p>
        </div>

        {sweet.quantity > 0 && (
          <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <input
              type="number"
              min="1"
              max={sweet.quantity}
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value) || 1)}
              className="flex-1 px-2 py-1 bg-background border border-border rounded text-text text-center text-sm"
            />
            <motion.button
              onClick={() => {
                onPurchase(sweet._id, qty);
                setQty(1);
              }}
              className="flex-1 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium rounded hover:shadow-lg hover:shadow-primary/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
