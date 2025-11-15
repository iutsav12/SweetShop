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
    image: string; // existing image URL or emoji
  };
  onSubmit: (data: FormData) => void; // now sends FormData
  loading: boolean;
  mode: 'add' | 'edit';
}

export function SweetForm({
  initialData,
  onSubmit,
  loading,
  mode,
}: SweetFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name ?? '',
    category: initialData?.category ?? 'Chocolate',
    price: initialData?.price ?? 0,
    quantity: initialData?.quantity ?? 0,
    description: initialData?.description ?? '',
    image: initialData?.image ?? '', // for edit mode (existing URL/emoji)
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initialData?.image ?? null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('price', String(formData.price));
    data.append('quantity', String(formData.quantity));
    data.append('description', formData.description);

    if (imageFile) {
      // New file selected
      data.append('image', imageFile);
    } else if (formData.image) {
      // Keep old image in edit mode if no new file
      data.append('existingImage', formData.image);
    }

    if (initialData?._id) {
      data.append('_id', initialData._id);
    }

    onSubmit(data);
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
              setFormData({
                ...formData,
                price: parseFloat(e.target.value || '0'),
              })
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
              setFormData({
                ...formData,
                quantity: parseInt(e.target.value || '0'),
              })
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
          Image (upload from device)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
        />
        {preview && (
          <div className="mt-2">
            <p className="text-xs text-text/70 mb-1">Preview:</p>
            {/* If preview is URL of real image, this works fine. If old value was emoji, it'll still try to load, but mostly you'll now use files. */}
            <img
              src={preview}
              alt="Preview"
              className="h-24 w-24 object-cover rounded-lg border border-border"
            />
          </div>
        )}
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
