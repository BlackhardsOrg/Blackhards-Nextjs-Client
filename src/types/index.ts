export interface IUser {
  email: string;
  password: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IRegisterData {
  studioName: string;
  email: string;
  password: string;
}

export interface IResetPasswordData {
  email: string | string[] | undefined;
  password: string;
  resetToken: string | string[] | undefined;
}

export interface IVerifyEmailParams {
  email: string;
  verifyToken: string;
}

export interface AxiosError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}
