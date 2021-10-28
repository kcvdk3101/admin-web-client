declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_BASE_URL: string;
      REACT_APP_AUTH0_DOMAIN: string;
      REACT_APP_AUTH0_CLIENT_ID: string;
    }
  }
}

export {};
