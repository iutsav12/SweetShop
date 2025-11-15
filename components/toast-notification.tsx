'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastId = 0;
const toastQueue: Toast[] = [];
const subscribers: ((toasts: Toast[]) => void)[] = [];

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = (callback: (toasts: Toast[]) => void) => {
      subscribers.push(callback);
      return () => {
        subscribers.splice(subscribers.indexOf(callback), 1);
      };
    };

    return unsubscribe(setToasts);
  }, []);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = String(toastId++);
    const toast = { id, message, type };
    toastQueue.push(toast);
    
    subscribers.forEach((cb) => cb([...toastQueue]));

    setTimeout(() => {
      toastQueue.splice(
        toastQueue.findIndex((t) => t.id === id),
        1
      );
      subscribers.forEach((cb) => cb([...toastQueue]));
    }, 3000);
  };

  return { toasts, addToast };
}

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 100 }}
            className={`px-4 py-3 rounded-lg text-white text-sm font-medium backdrop-blur border ${
              toast.type === 'success'
                ? 'bg-green-600/80 border-green-500'
                : toast.type === 'error'
                  ? 'bg-red-600/80 border-red-500'
                  : 'bg-blue-600/80 border-blue-500'
            }`}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
