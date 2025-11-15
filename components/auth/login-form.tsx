'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      onSuccess();
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label className="block text-sm font-medium mb-2 text-text">
          Email
        </label>
        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-primary text-text placeholder-text-muted"
          placeholder="you@example.com"
          required
          whileFocus={{ scale: 1.02 }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2 text-text">
          Password
        </label>
        <motion.input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-primary text-text placeholder-text-muted"
          placeholder="••••••••"
          required
          whileFocus={{ scale: 1.02 }}
        />
      </div>
      {error && (
        <motion.div
          className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </motion.button>
    </motion.form>
  );
}
