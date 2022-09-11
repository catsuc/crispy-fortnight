import { vi } from 'vitest';

vi.mock('../../libs/nodemailer', () => {
  return {
    __esModule: true,
    mailTransporter: {
      sendMail: vi.fn(() => Promise.resolve()),
    },
  };
});
