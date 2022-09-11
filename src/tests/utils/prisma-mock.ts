import { vi } from 'vitest';

vi.mock('../../libs/prisma', () => {
  return {
    __esModule: true,
    prisma: {
      message: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
    },
  };
});
