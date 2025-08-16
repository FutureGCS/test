import { NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import { getUser } from '@/lib/auth';

// GET /api/v1/products
export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const products = await prisma.product.findMany({
    include: { vendor: true },
  });
  return NextResponse.json(products);
}

// POST /api/v1/products
export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { name, sku, cost_price, selling_price, stock_quantity, reorder_level, vendor_id } = await request.json();

  if (!name || !cost_price || !selling_price || !vendor_id) {
    return NextResponse.json({ message: 'Name, cost_price, selling_price, and vendor_id are required' }, { status: 400 });
  }

  const newProduct = await prisma.product.create({
    data: {
      name,
      sku,
      cost_price,
      selling_price,
      stock_quantity,
      reorder_level,
      vendor_id,
    },
  });
  return NextResponse.json(newProduct, { status: 201 });
}
