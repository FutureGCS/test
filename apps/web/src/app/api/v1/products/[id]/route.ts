import { NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import { getUser } from '@/lib/auth';

// GET /api/v1/products/:id
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { vendor: true },
  });
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

// PUT /api/v1/products/:id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  const { name, sku, cost_price, selling_price, stock_quantity, reorder_level, vendor_id } = await request.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
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
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}

// DELETE /api/v1/products/:id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  try {
    await prisma.product.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}
