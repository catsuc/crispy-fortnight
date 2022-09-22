import { jest } from '@jest/globals';

jest.mock('../../libs/prisma', () => {
  return {
    __esModule: true,
    prisma: {
      message: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    },
  };
});
