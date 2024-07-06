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
  email: string;
}

export interface IVerifyEmailParams {
  email: string;
  verificationToken: string;
}
