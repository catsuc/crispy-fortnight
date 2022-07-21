import { Transporter } from "nodemailer";
import nodemailer from 'nodemailer';

interface MailTransportFactoryData {
  host?: string;
  port?: number;
  secure?: boolean;
  auth?: {
    user?: string;
    pass?: string;
  }
}

export function mailTransportFactory(data: MailTransportFactoryData): Transporter {
  const transporter = nodemailer.createTransport({
    host: data.host,
    port: data.port,
    secure: data.secure,
    auth: {
      user: data.auth?.user,
      pass: data.auth?.pass
    },
  });

  return transporter;
}
