import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@repo/db';
import { getUser } from '@/lib/auth';

// GET /api/v1/products/:id
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  const product = await getProductById(id);
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
  const body = await request.json();

  try {
    const updatedProduct = await updateProduct(id, body);
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
    await deleteProduct(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}
