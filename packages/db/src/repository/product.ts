import { prisma, Product } from "..";

export const getAllProducts = () => {
  return prisma.product.findMany({ include: { vendor: true } });
};

export const getProductById = (id: string) => {
  return prisma.product.findUnique({ where: { id }, include: { vendor: true } });
};

// Define a type for the product data to be created
type ProductCreateData = Omit<Product, 'id'>;

export const createProduct = (data: ProductCreateData) => {
  return prisma.product.create({ data });
};

// Define a type for the product data to be updated
type ProductUpdateData = Partial<ProductCreateData>;

export const updateProduct = (id: string, data: ProductUpdateData) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = (id: string) => {
  return prisma.product.delete({ where: { id } });
};
