'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';

export default function Landing() {
  const [mode, setMode] = useState<'landing' | 'login' | 'register'>('landing');
  const router = useRouter();

  const handleAuthSuccess = () => {
    setTimeout(() => router.push('/dashboard'), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <motion.div className="relative z-10 w-full max-w-md">
        {mode === 'landing' && (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Sweet Shop
              </h1>
              <p className="text-lg text-text-muted">
                Discover the finest selection of sweets and treats
              </p>
            </div>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={() => setMode('login')}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={() => setMode('register')}
                className="w-full py-3 px-4 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Account
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {mode === 'login' && (
          <motion.div
            className="bg-surface/80 backdrop-blur border border-border rounded-2xl p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-text">Welcome Back</h2>
            <LoginForm onSuccess={handleAuthSuccess} />
            <p className="text-center text-text-muted mt-4 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          </motion.div>
        )}

        {mode === 'register' && (
          <motion.div
            className="bg-surface/80 backdrop-blur border border-border rounded-2xl p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-text">Create Account</h2>
            <RegisterForm onSuccess={handleAuthSuccess} />
            <p className="text-center text-text-muted mt-4 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
