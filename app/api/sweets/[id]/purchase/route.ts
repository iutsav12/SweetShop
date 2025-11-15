import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sweet from '@/models/Sweet';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: any) {
  try {
    const token = getTokenFromRequest(req);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const id = params.id;
    const { quantity } = await req.json();

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return NextResponse.json(
        { error: 'Sweet not found' },
        { status: 404 }
      );
    }

    if (sweet.quantity < quantity) {
      return NextResponse.json(
        { error: 'Insufficient quantity' },
        { status: 400 }
      );
    }

    sweet.quantity -= quantity;
    await sweet.save();

    return NextResponse.json({
      message: 'Purchase successful',
      sweet,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Purchase failed' },
      { status: 500 }
    );
  }
}
