const config = window as any;

export class Configs {
  static API_BASE_URL = config.API_BASE_URL as string;

  static AUTH0_DOMAIN = config.AUTH0_DOMAIN;
  static AUTH0_CLIENT_ID = config.AUTH0_CLIENT_ID;
}
