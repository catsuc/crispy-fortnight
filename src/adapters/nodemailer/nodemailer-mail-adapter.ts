import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const { MAIL_HOST, MAIL_PORT, MAIL_AUTH_USER ,MAIL_AUTH_PASSWORD } = process.env;

if (!MAIL_HOST || !MAIL_PORT || !MAIL_AUTH_USER || !MAIL_AUTH_PASSWORD) {
  throw new Error('bdsaujdsa')
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASSWORD,
  },
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData): Promise<void> {
    await transporter.sendMail({
      to: data.to,
      subject: data.subject,
      text: data.body,
    })
  }
}
