import { prisma } from '@/lib/prismaClient';

const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: { id: 'asc' },
  });
};

export default getCategories;
