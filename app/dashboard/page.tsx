'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SweetCard } from '@/components/sweet-card';
import { SearchBar } from '@/components/search-bar';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(userData));

    const fetchSweets = async () => {
      try {
        const res = await fetch('/api/sweets');
        const data = await res.json();
        setSweets(data);
        setFilteredSweets(data);
      } catch (error) {
        console.error('Failed to fetch sweets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSweets();
  }, [router]);

  const handleSearch = async (
    name: string,
    category: string,
    minPrice: string,
    maxPrice: string
  ) => {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (category) params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    try {
      const res = await fetch(`/api/sweets/search?${params}`);
      const data = await res.json();
      setFilteredSweets(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handlePurchase = async (sweetId: string, quantity: number) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/sweets/${sweetId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      if (data.sweet) {
        setSweets((prev) =>
          prev.map((s) => (s._id === sweetId ? data.sweet : s))
        );
        setFilteredSweets((prev) =>
          prev.map((s) => (s._id === sweetId ? data.sweet : s))
        );
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sweet Shop
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-text-muted text-sm">{user?.name}</span>
            <motion.button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/');
              }}
              className="px-4 py-2 bg-surface border border-border rounded-lg text-text hover:border-primary text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
            {user?.role === 'admin' && (
              <motion.button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Admin Panel
              </motion.button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <SearchBar onSearch={handleSearch} />

        {/* Sweets Grid */}
        {loading ? (
          <motion.div
            className="flex items-center justify-center h-64"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-text-muted text-lg">Loading sweets...</span>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredSweets.length > 0 ? (
              filteredSweets.map((sweet, idx) => (
                <div key={sweet._id} style={{ animationDelay: `${idx * 50}ms` }}>
                  <SweetCard sweet={sweet} onPurchase={handlePurchase} />
                </div>
              ))
            ) : (
              <motion.p
                className="col-span-full text-center text-text-muted text-lg py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No sweets found. Try adjusting your search.
              </motion.p>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
