import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sweet from '@/models/Sweet';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const sweets = await Sweet.find({});
    return NextResponse.json(sweets);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sweets' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { name, category, price, quantity, description, image } = await req.json();

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      description,
      image,
    });

    return NextResponse.json(sweet, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create sweet' },
      { status: 500 }
    );
  }
}
