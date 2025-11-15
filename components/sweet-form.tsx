'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SweetFormProps {
  initialData?: {
    _id?: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
  };
  onSubmit: (data: any) => void;
  loading: boolean;
  mode: 'add' | 'edit';
}

export function SweetForm({
  initialData,
  onSubmit,
  loading,
  mode,
}: SweetFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      category: 'Chocolate',
      price: 0,
      quantity: 0,
      description: '',
      image: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
          >
            <option>Chocolate</option>
            <option>Candy</option>
            <option>Pastry</option>
            <option>Lollipop</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: parseInt(e.target.value) })
            }
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Image (emoji or URL)
        </label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
          placeholder="🍬 or image URL"
        />
      </div>
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading
          ? 'Processing...'
          : mode === 'add'
            ? 'Add Sweet'
            : 'Update Sweet'}
      </motion.button>
    </motion.form>
  );
}
