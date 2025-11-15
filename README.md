# Sweet Shop Management System

A full-stack sweet shop management application built with Next.js, MongoDB, and Framer Motion animations.

## Features

- **User Authentication**: Secure JWT-based authentication system
- **Product Management**: Add, edit, delete, and restock sweets
- **Shopping Experience**: Browse, search, and purchase sweets
- **Admin Panel**: Comprehensive management interface for administrators
- **Beautiful Animations**: Smooth transitions and interactive components
- **Responsive Design**: Mobile-first design with modern glassmorphism

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express (via Next.js API routes)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB connection URL

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment variables in `.env.local`:
\`\`\`env
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret_key
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## Project Structure

\`\`\`
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin dashboard
│   ├── dashboard/        # User dashboard
│   └── layout.tsx        # Root layout
├── components/           # React components
├── hooks/                # Custom hooks
├── lib/                  # Utilities
├── models/               # MongoDB schemas
└── scripts/              # Database scripts
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets
- `GET /api/sweets` - Get all sweets
- `POST /api/sweets` - Add new sweet (admin only)
- `GET /api/sweets/search` - Search sweets
- `PUT /api/sweets/:id` - Update sweet (admin only)
- `DELETE /api/sweets/:id` - Delete sweet (admin only)

### Inventory
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (admin only)

## Demo Credentials

**Admin Account:**
- Email: `admin@sweetshop.com`
- Password: `admin123`

**User Account:**
- Email: `user@example.com`
- Password: `user123`

## Features Implemented

✅ Backend API with all required endpoints
✅ User authentication with JWT tokens
✅ Product CRUD operations
✅ Inventory management
✅ Search and filtering
✅ Admin panel
✅ Beautiful animations with Framer Motion
✅ Responsive mobile-first design
✅ Modern glassmorphism UI
✅ Professional color scheme

## Future Enhancements

- Shopping cart functionality
- Order history
- Payment integration
- User wishlist
- Product ratings and reviews
- Email notifications
- Dashboard analytics

## License

MIT
