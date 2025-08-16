import { NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import { getUser } from '@/lib/auth';

// GET /api/v1/vendors
export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const vendors = await prisma.vendor.findMany();
  return NextResponse.json(vendors);
}

// POST /api/v1/vendors
export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { name } = await request.json();
  if (!name) {
    return NextResponse.json({ message: 'Name is required' }, { status: 400 });
  }
  const newVendor = await prisma.vendor.create({
    data: { name },
  });
  return NextResponse.json(newVendor, { status: 201 });
}
