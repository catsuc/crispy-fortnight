import '../tests/utils/nodemailer-mock';
import { mailTransporter } from '../libs/nodemailer';
import { SendMailService } from './send-message-mail-service';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('CreateMessageService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    const service = new SendMailService();

    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(SendMailService);
  });

  it('should have execute method', () => {
    const service = new SendMailService();

    expect(service.execute).toBeDefined();
    expect(service.execute).toBeInstanceOf(Function);
  });

  it('should call transport.sendMail when called', async () => {
    const service = new SendMailService();

    const input = {
      to: 'example receiver email',
      message: 'example massage',
    };

    await service.execute(input);

    expect(mailTransporter.sendMail).toBeCalledTimes(1);
    expect(mailTransporter.sendMail).toBeCalledWith({
      to: input.to,
      subject: 'Cápsula do Tempo',
      from: 'capsula-do-tempo@mail.catsuc.com',
      text: input.message,
    });
  });
});
