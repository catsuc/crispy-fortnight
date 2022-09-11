import nodemailer from 'nodemailer';

interface Options {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

if (!process.env.MAIL_HOST) throw new Error('Invalid MAIL_HOST environment');

if (!process.env.MAIL_PORT) throw new Error('Invalid MAIL_PORT environment');

if (!process.env.MAIL_SECURE) throw new Error('Invalid MAIL_SECURE environment');

if (!process.env.MAIL_USER) throw new Error('Invalid MAIL_USER environment');

if (!process.env.MAIL_PASSWORD) throw new Error('Invalid MAIL_PASSWORD environment');

const options: Options = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE !== 'false', // by default it will be true
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
};

const mailTransporter = nodemailer.createTransport(options);

export { mailTransporter };
