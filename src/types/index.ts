import { Dispatch, SetStateAction } from "react";


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

export interface IPlan {
  type: "basic" | "standard" | "premium";
  price: number;
  title: string;
  howLongToLaunch: number;

  howManyCustomizations: number;
  customizationCharge: number;
  

  howManyLevels: number;

  hasDocumentation: boolean;

  hasAdminPanel: boolean;
}

export interface IExtraService {
  title: string;
  description: string;
  price: number;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface IPlans {
  basic: IPlan;
  standard: IPlan;
  premium: IPlan;
}

export interface IGameTitle {
  developerEmail: string;
  gameFileLink: string;
  title: string;
  description: string;
  gamePlayScreenShots: string[];
  gamePlayVideo: string;
  genre: string[];
  tags: string[];
  targetPlatform: string[];
  price: number;
  saleType: string;
  releaseDate: string;
  legal: string;
  ageRating: string;
  developerId: string;
  gameRating: number;
  gamePlays: number;
  isCustomizationEnabled?: boolean;
  customizationCharge?: number;
  plans?: IPlans;
  isAIAllowedPricing: boolean;

  faqs?: IFAQ[];
}

export interface IBasicInformation {
  id: number;
  gameTitle: IGameTitle;
  setGameTitle: Dispatch<SetStateAction<IGameTitle>>;
  getPageProgress: IPageProgress[];
  setGetPageProgress: Dispatch<SetStateAction<IPageProgress[]>>;
  getCurrentPageState: number;
  setCurrentPageState: Dispatch<SetStateAction<number>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}

export interface IPricingAndPlans {
  id: number;
  gameTitle: IGameTitle;
  setGameTitle: Dispatch<SetStateAction<IGameTitle>>;
  getPageProgress: IPageProgress[];
  setGetPageProgress: Dispatch<SetStateAction<IPageProgress[]>>;
  getCurrentPageState: number;
  setCurrentPageState: Dispatch<SetStateAction<number>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}

export interface IPackagePlans {
  gameTitle: IGameTitle;
  setGameTitle: Dispatch<SetStateAction<IGameTitle>>;
}
export interface IUploadAttachments {
  id: number;
  gameTitle: IGameTitle;
  setGameTitle: Dispatch<SetStateAction<IGameTitle>>;
  getPageProgress: IPageProgress[];
  setGetPageProgress: Dispatch<SetStateAction<IPageProgress[]>>;
  getCurrentPageState: number;
  setCurrentPageState: Dispatch<SetStateAction<number>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}
export interface ITagSearch {
  defaultSelect: any;
  handler: any;
}

export interface IPageProgress {
  id: number;
  pageText: string;
  percentage: number;
  isDone: boolean;
}

export interface IGameTabs {
  gameTitle: IGameTitle;
  setGameTitle: Dispatch<SetStateAction<IGameTitle>>;
  getPageProgress: IPageProgress[];
  setGetPageProgress: Dispatch<SetStateAction<IPageProgress[]>>;
  getCurrentPageState: number;
  setCurrentPageState: Dispatch<SetStateAction<number>>;
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
