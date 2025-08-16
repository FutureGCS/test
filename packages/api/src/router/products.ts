import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import prisma from '../db';

const router = Router();

// All product routes are protected
router.use(authenticate);

// GET /api/v1/products - Get all products
router.get('/', async (req, res) => {
  const products = await prisma.product.findMany({
    include: { vendor: true }, // Also fetch the related vendor
  });
  res.json(products);
});

// GET /api/v1/products/:id - Get a single product
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { vendor: true },
  });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// POST /api/v1/products - Create a new product
router.post('/', async (req, res) => {
  const { name, sku, cost_price, selling_price, stock_quantity, reorder_level, vendor_id } = req.body;

  if (!name || !cost_price || !selling_price || !vendor_id) {
    return res.status(400).json({ message: 'Name, cost_price, selling_price, and vendor_id are required' });
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
  res.status(201).json(newProduct);
});

// PUT /api/v1/products/:id - Update a product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, sku, cost_price, selling_price, stock_quantity, reorder_level, vendor_id } = req.body;

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
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE /api/v1/products/:id - Delete a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;
