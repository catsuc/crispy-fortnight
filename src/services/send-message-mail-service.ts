import { mailTransporter } from '../libs/nodemailer';

interface SendMailRequest {
  to: string;
  message: string;
}

class SendMailService {
  async execute(data: SendMailRequest) {
    const { message, to } = data;

    await mailTransporter.sendMail({
      to,
      from: 'capsula-do-tempo@mail.catsuc.com',
      subject: 'Cápsula do Tempo',
      text: message,
    });
  }
}

export { SendMailService };
