import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sweet from '@/models/Sweet';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function PUT(req: NextRequest, { params }: any) {
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
    const id = params.id;
    const updates = await req.json();

    const sweet = await Sweet.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(sweet);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update sweet' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
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
    const id = params.id;

    await Sweet.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Sweet deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete sweet' },
      { status: 500 }
    );
  }
}
