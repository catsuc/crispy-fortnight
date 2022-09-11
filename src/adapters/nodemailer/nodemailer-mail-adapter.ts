import { mailTransportFactory } from "../../factories/mail-transport-factory";
import { MailAdapter, SendMailData } from "../mail-adapter";

export class NodemailerMailAdapter implements MailAdapter {
  private mailTransport;
  constructor() {
    this.mailTransport = mailTransportFactory({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS
      }
    })
  }

  async sendMail(data: SendMailData): Promise<void> {
    await this.mailTransport.sendMail({
      to: data.to,
      subject: data.subject,
      from: 'capsula-do-tempo@mail.catsuc.com',
      text: data.body,
    })
  }
}
