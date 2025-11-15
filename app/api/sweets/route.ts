import { NextRequest, NextResponse } from 'next/server';
import { Buffer } from 'buffer';
import connectDB from '@/lib/mongodb';
import Sweet from '@/models/Sweet';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const sweets = await Sweet.find({});
    return NextResponse.json(sweets);
  } catch (error) {
    console.error('Failed to fetch sweets:', error);
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

    // 🔹 Read multipart/form-data instead of JSON
    const formData = await req.formData();

    const name = formData.get('name') as string | null;
    const category = formData.get('category') as string | null;
    const priceRaw = formData.get('price');
    const quantityRaw = formData.get('quantity');
    const description = formData.get('description') as string | null;

    const existingImage = (formData.get('existingImage') as string) || '';
    const imageFile = formData.get('image') as File | null;

    if (!name || !category || !priceRaw || !quantityRaw) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const price = Number(priceRaw);
    const quantity = Number(quantityRaw);

    let image: string = existingImage;

    // 🔹 If a new file is uploaded, convert it to base64 and store
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const mimeType = imageFile.type || 'image/png';

      // Store as data URL in DB (simple, works without cloud storage)
      image = `data:${mimeType};base64,${base64}`;
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      description: description ?? '',
      image,
    });

    return NextResponse.json(sweet, { status: 201 });
  } catch (error) {
    console.error('Failed to create sweet:', error);
    return NextResponse.json(
      { error: 'Failed to create sweet' },
      { status: 500 }
    );
  }
}
