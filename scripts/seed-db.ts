// scripts/seed-db.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from '../lib/mongodb';
import User from '../models/User';
import Sweet from '../models/Sweet';

async function seedDatabase() {
  try {
    console.log('[seed] Connecting to MongoDB...');
    await connectDB();

    console.log('[seed] Clearing existing users and sweets...');
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // Create admin user
    console.log('[seed] Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      email: 'admin@sweetshop.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
    });

    // Create regular user
    console.log('[seed] Creating regular user...');
    const userPassword = await bcrypt.hash('user123', 10);
    await User.create({
      email: 'user@example.com',
      password: userPassword,
      name: 'John Doe',
      role: 'user',
    });

    // Create sample sweets
    console.log('[seed] Creating sample sweets...');
    const sweets = [
      {
        name: 'Dark Chocolate Truffle',
        category: 'Chocolate',
        price: 5.99,
        quantity: 50,
        description: 'Rich dark chocolate with a smooth ganache center',
        image: '🍫',
      },
      {
        name: 'Rainbow Lollipop',
        category: 'Lollipop',
        price: 2.49,
        quantity: 100,
        description: 'Colorful layered lollipop with mixed berry flavor',
        image: '🍭',
      },
      {
        name: 'Strawberry Pastry',
        category: 'Pastry',
        price: 4.99,
        quantity: 30,
        description: 'Fresh strawberry filling in a buttery pastry shell',
        image: '🧁',
      },
      {
        name: 'Caramel Candy',
        category: 'Candy',
        price: 3.99,
        quantity: 75,
        description: 'Soft caramel candy with sea salt topping',
        image: '🍬',
      },
      {
        name: 'Milk Chocolate Bar',
        category: 'Chocolate',
        price: 4.49,
        quantity: 60,
        description: 'Smooth creamy milk chocolate bar',
        image: '🍫',
      },
      {
        name: 'Gummy Bears',
        category: 'Candy',
        price: 2.99,
        quantity: 120,
        description: 'Assorted fruit flavored gummy bears',
        image: '🐻',
      },
    ];

    await Sweet.insertMany(sweets);

    console.log('[seed] Database seeded successfully!');
  } catch (error) {
    console.error('[seed] Seed error:', error);
    process.exit(1);
  } finally {
    console.log('[seed] Disconnecting from MongoDB...');
    await mongoose.disconnect();
    console.log('[seed] Done.');
    process.exit(0);
  }
}

seedDatabase();
