'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SweetForm } from '@/components/sweet-form';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  image: string; // URL or emoji
}

export default function AdminPanel() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [user, setUser] = useState<any>(null);
  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);
  const [loading, setLoading] = useState(false);
  const [restockId, setRestockId] = useState<string | null>(null);
  const [restockQty, setRestockQty] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    setUser(parsedUser);

    const fetchSweets = async () => {
      try {
        const res = await fetch('/api/sweets');
        const data = await res.json();
        setSweets(data);
      } catch (error) {
        console.error('Failed to fetch sweets:', error);
      }
    };

    fetchSweets();
  }, [router]);

  // ADD with FormData (including file)
  const handleAddSweet = async (formData: FormData) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/sweets', {
        method: 'POST',
        headers: {
          // IMPORTANT: don't set Content-Type manually for FormData
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data: Sweet = await res.json();
      if (data._id) {
        setSweets([...sweets, data]);
        setMode('list');
      }
    } catch (error) {
      console.error('Failed to add sweet:', error);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE with FormData (including optional new file)
  const handleUpdateSweet = async (formData: FormData) => {
    if (!selectedSweet?._id) return;

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/sweets/${selectedSweet._id}`, {
        method: 'PUT',
        headers: {
          // Again, don't set Content-Type for FormData
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data: Sweet = await res.json();
      if (data._id) {
        setSweets(sweets.map((s) => (s._id === data._id ? data : s)));
        setMode('list');
        setSelectedSweet(null);
      }
    } catch (error) {
      console.error('Failed to update sweet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSweet = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`/api/sweets/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSweets(sweets.filter((s) => s._id !== id));
    } catch (error) {
      console.error('Failed to delete sweet:', error);
    }
  };

  const handleRestock = async (id: string, qty: number) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/sweets/${id}/restock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: qty }),
      });
      const data = await res.json();
      if (data.sweet) {
        setSweets(
          sweets.map((s) => (s._id === data.sweet._id ? data.sweet : s))
        );
        setRestockId(null);
      }
    } catch (error) {
      console.error('Restock failed:', error);
    }
  };

  const renderSweetImage = (sweet: Sweet) => {
    const value = sweet.image;
    const isUrl = value?.startsWith('http://') || value?.startsWith('https://');

    if (isUrl) {
      return (
        <img
          src={value}
          alt={sweet.name}
          className="h-10 w-10 rounded-md object-cover border border-border"
        />
      );
    }

    return <span className="text-2xl">{value || '🍬'}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Panel
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
            <motion.button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-medium text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Shop
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <motion.div
          className="flex gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={() => setMode('list')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              mode === 'list'
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50'
                : 'bg-surface border border-border text-text hover:border-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Sweets
          </motion.button>
          <motion.button
            onClick={() => {
              setMode('add');
              setSelectedSweet(null);
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              mode === 'add'
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50'
                : 'bg-surface border border-border text-text hover:border-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add New
          </motion.button>
        </motion.div>

        {mode === 'list' && (
          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {sweets.map((sweet, idx) => (
              <motion.div
                key={sweet._id}
                className="bg-surface/80 backdrop-blur border border-border rounded-lg p-4 flex justify-between items-start hover:border-primary transition-all"
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {renderSweetImage(sweet)}
                    <div>
                      <h3 className="font-bold text-text">{sweet.name}</h3>
                      <p className="text-xs text-primary">{sweet.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted">
                    {sweet.description}
                  </p>
                  <div className="mt-2 flex gap-4">
                    <span className="text-sm">
                      Price:{' '}
                      <span className="text-accent font-bold">
                        ${sweet.price}
                      </span>
                    </span>
                    <span
                      className={`text-sm ${
                        sweet.quantity > 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      Stock: {sweet.quantity}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {restockId === sweet._id ? (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        value={restockQty}
                        onChange={(e) =>
                          setRestockQty(parseInt(e.target.value || '1'))
                        }
                        className="w-16 px-2 py-1 bg-background border border-border rounded text-text text-sm"
                      />
                      <motion.button
                        onClick={() => handleRestock(sweet._id, restockQty)}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        whileTap={{ scale: 0.95 }}
                      >
                        OK
                      </motion.button>
                      <motion.button
                        onClick={() => setRestockId(null)}
                        className="px-3 py-1 bg-surface border border-border text-text text-sm rounded hover:border-primary"
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => setRestockId(sweet._id)}
                        className="px-3 py-1 bg-accent/20 text-accent text-sm rounded hover:bg-accent/30"
                        whileTap={{ scale: 0.95 }}
                      >
                        Restock
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setSelectedSweet(sweet);
                          setMode('edit');
                        }}
                        className="px-3 py-1 bg-primary/20 text-primary text-sm rounded hover:bg-primary/30"
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteSweet(sweet._id)}
                        className="px-3 py-1 bg-red-600/20 text-red-400 text-sm rounded hover:bg-red-600/30"
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {mode === 'add' && (
          <motion.div
            className="max-w-2xl bg-surface/80 backdrop-blur border border-border rounded-xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-bold mb-4 text-text">Add New Sweet</h2>
            <SweetForm onSubmit={handleAddSweet} loading={loading} mode="add" />
          </motion.div>
        )}

        {mode === 'edit' && selectedSweet && (
          <motion.div
            className="max-w-2xl bg-surface/80 backdrop-blur border border-border rounded-xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-bold mb-4 text-text">Edit Sweet</h2>
            <SweetForm
              initialData={selectedSweet}
              onSubmit={handleUpdateSweet}
              loading={loading}
              mode="edit"
            />
            <motion.button
              onClick={() => {
                setMode('list');
                setSelectedSweet(null);
              }}
              className="mt-4 px-4 py-2 bg-surface border border-border rounded-lg text-text hover:border-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to List
            </motion.button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
