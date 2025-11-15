'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (name: string, category: string, minPrice: string, maxPrice: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    onSearch(name, category, minPrice, maxPrice);
  };

  return (
    <motion.div
      className="bg-surface/80 backdrop-blur border border-border rounded-xl p-4 space-y-3 md:space-y-0 md:flex md:gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.input
        type="text"
        placeholder="Search by name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-primary"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
      >
        <option value="">All Categories</option>
        <option value="Chocolate">Chocolate</option>
        <option value="Candy">Candy</option>
        <option value="Pastry">Pastry</option>
        <option value="Lollipop">Lollipop</option>
      </motion.select>
      <motion.input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="px-4 py-2 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-primary"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="px-4 py-2 bg-background border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-primary"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.button
        onClick={handleSearch}
        className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/50 whitespace-nowrap"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Search
      </motion.button>
    </motion.div>
  );
}
