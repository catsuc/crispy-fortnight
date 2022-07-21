import { mailTransportFactory } from "../../factories/mail-transport-factory";
import { MailAdapter, SendMailData } from "../mail-adapter";

export class NodemailerMailAdapter implements MailAdapter {
  private mailTransport;
  constructor() {
    this.mailTransport = mailTransportFactory({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
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
      text: data.body,
    })
  }
}
