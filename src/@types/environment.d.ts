declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';

      DATABASE_URL: string | undefined;
      PORT: number | undefined;

      MAIL_HOST: string | undefined;
      MAIL_PORT: number | undefined;
      MAIL_AUTH_USER: string | undefined;
      MAIL_AUTH_PASSWORD: string | undefined;
    }
  }
}
