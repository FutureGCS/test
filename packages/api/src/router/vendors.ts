import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import prisma from '../db';

const router = Router();

// All vendor routes are protected
router.use(authenticate);

// GET /api/v1/vendors - Get all vendors
router.get('/', async (req, res) => {
  const vendors = await prisma.vendor.findMany();
  res.json(vendors);
});

// GET /api/v1/vendors/:id - Get a single vendor
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const vendor = await prisma.vendor.findUnique({ where: { id } });
  if (!vendor) {
    return res.status(404).json({ message: 'Vendor not found' });
  }
  res.json(vendor);
});

// POST /api/v1/vendors - Create a new vendor
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const newVendor = await prisma.vendor.create({
    data: { name },
  });
  res.status(201).json(newVendor);
});

// PUT /api/v1/vendors/:id - Update a vendor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  try {
    const updatedVendor = await prisma.vendor.update({
      where: { id },
      data: { name },
    });
    res.json(updatedVendor);
  } catch (error) {
    res.status(404).json({ message: 'Vendor not found' });
  }
});

// DELETE /api/v1/vendors/:id - Delete a vendor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.vendor.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Vendor not found' });
  }
});

export default router;
