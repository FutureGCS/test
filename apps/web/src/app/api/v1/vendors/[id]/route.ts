import { NextResponse } from 'next/server';
import { getVendorById, updateVendor, deleteVendor } from '@repo/db';
import { getUser } from '@/lib/auth';

// GET /api/v1/vendors/:id
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  const vendor = await getVendorById(id);
  if (!vendor) {
    return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
  }
  return NextResponse.json(vendor);
}

// PUT /api/v1/vendors/:id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  const { name } = await request.json();
  if (!name) {
    return NextResponse.json({ message: 'Name is required' }, { status: 400 });
  }
  try {
    const updatedVendor = await updateVendor(id, name);
    return NextResponse.json(updatedVendor);
  } catch (error) {
    return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
  }
}

// DELETE /api/v1/vendors/:id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  try {
    await deleteVendor(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
  }
}
