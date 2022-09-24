declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';

      DATABASE_URL: string | undefined;
      PORT: number | undefined;

      MAIL_HOST: string | undefined;
      MAIL_PORT: number | undefined;
      MAIL_SECURE: string | undefined;
      MAIL_USER: string | undefined;
      MAIL_PASSWORD: string | undefined;
    }
  }
}

export { };

