import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@repo/db';
import { getUser } from '@/lib/auth';

// GET /api/v1/products
export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const products = await getAllProducts();
  return NextResponse.json(products);
}

// POST /api/v1/products
export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();

  if (!body.name || !body.cost_price || !body.selling_price || !body.vendor_id) {
    return NextResponse.json({ message: 'Name, cost_price, selling_price, and vendor_id are required' }, { status: 400 });
  }

  const newProduct = await createProduct(body);
  return NextResponse.json(newProduct, { status: 201 });
}
