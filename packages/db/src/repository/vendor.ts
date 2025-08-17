import { prisma } from "..";

export const getAllVendors = () => {
  return prisma.vendor.findMany();
};

export const getVendorById = (id: string) => {
  return prisma.vendor.findUnique({ where: { id } });
};

export const createVendor = (name: string) => {
  return prisma.vendor.create({ data: { name } });
};

export const updateVendor = (id: string, name: string) => {
  return prisma.vendor.update({
    where: { id },
    data: { name },
  });
};

export const deleteVendor = (id: string) => {
  return prisma.vendor.delete({ where: { id } });
};
