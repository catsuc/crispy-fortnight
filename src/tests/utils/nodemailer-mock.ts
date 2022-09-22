import { jest } from '@jest/globals';

jest.mock('../../libs/nodemailer', () => {
  return {
    __esModule: true,
    mailTransporter: {
      sendMail: jest.fn(() => Promise.resolve()),
    },
  };
});
