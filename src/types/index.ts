import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";

export interface IUser {
  email: string;
  password: string;
  studioName: string;
  profileImageURL: string;
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

export interface IUserGameTitle {}

export interface IRegisterEarlyData {
  studioName: string;
  country: string;
  email: string;
  yourPurpose: string;
  portfolioLink: string;
  yourRole: string;
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
  description: string;
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
  _id?: string;
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
  isApproved?: boolean;
  isOnSale?: boolean;
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
  updatedAt?: string;
  createdAt?: string;
}

export interface IAuction {
  _id?: string;
  developerEmail: string;
  gameFileLink: string;
  title: string;
  description: string;
  gamePlayScreenShots: string[];
  gamePlayVideo: string;
  genre: string[];
  tags: string[];
  targetPlatform: string[];
  saleType: string;
  releaseDate: string;
  legal: string;
  ageRating: string;
  developerId: string;
  gameRating: number;
  gamePlays: number;
  isCustomizationEnabled?: boolean;
  customizationCharge?: number;

  gameTitleId?: string;
  endTime: string;
  reservedPrice: number;
  startTime: string;
}

export interface IHighestBidder {
  id: string;
  bidderEmail: string;
  bid: number;
  auctionId: string;
  confirmed: string;
  createdAt: Date;
  updatedAt: Date;
}

// export interface IPopularGameSlideCard {
//   data: IGameTitleGQL;
//   style: string;
//   isContentExpanded: boolean;
// }

export interface IGameTitleGQL extends IGameTitle {
  developer: IUser;
}

export interface IAuctionGQL extends IAuction {
  id: string;
  gametitle: IGameTitle;
  updatedAt: string;
  developer: {
    studioName: string;
  };
}

///Web3

// Define the interfaces for transactions and contracts
export interface Transaction {
  buyer: string;
  amount: string; // Use string to handle large numbers in ethers.js
  gameId: string;
  timestamp: number;
}

// Define the type for the USDT and marketplace contracts
export interface USDTContract extends ethers.Contract {
  approve(
    spender: string,
    amount: ethers.BigNumber
  ): Promise<ethers.providers.TransactionResponse>;
}

export interface MarketplaceContract extends ethers.Contract {
  payForGame(
    gameId: string,
    amount: ethers.BigNumber
  ): Promise<ethers.providers.TransactionResponse>;
}
///

export interface IReview {
  gameTitle: {
    id: string;
  };
  rating: number;
  gameTitleId: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

export interface IGamePackageIDs {
  id: string;
  packageType: string;
  price: string;
  title: string;
}

export interface IPopularGameSlideCard {
  data: IGameTitleGQL;
  style?: string;
  isContentExpanded?: boolean;
  profileImageURL: string;
}
export interface IBasicInformation {
  id: number;
  // gameTitle: IGameTitle;
  // setGameTitle: Dispatch<SetStateAction<IGameTitle>>;
  getPageProgress: IPageProgress[];
  setGetPageProgress: Dispatch<SetStateAction<IPageProgress[]>>;
  getCurrentPageState: number;
  setCurrentPageState: Dispatch<SetStateAction<number>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}

export interface IPricingAndPlans {
  id: number;
  // gameTitle: IGameTitle;
  // setGameTitle: Dispatch<SetStateAction<IGameTitle>>;
  getPageProgress: IPageProgress[];
  setGetPageProgress: Dispatch<SetStateAction<IPageProgress[]>>;
  getCurrentPageState: number;
  setCurrentPageState: Dispatch<SetStateAction<number>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}

export interface IPackagePlans {
  // gameTitle: IGameTitle;
  // setGameTitle: Dispatch<SetStateAction<IGameTitle>>;
}
export interface IUploadAttachments {
  id: number;
  // gameTitle: IGameTitle;
  // setGameTitle: Dispatch<SetStateAction<IGameTitle>>;
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

export interface IGameTitleInventory {
  gameId: string;
  gametitle: IGameTitleGQL;
  packageType: string;
  packageTypeGameLink: string;
  updatedAt: string;
}

export interface IPageProgress {
  id: number;
  pageText: string;
  percentage: number;
  isDone: boolean;
}

export interface IGameTabs {
  // gameTitle: IGameTitle;
  // setGameTitle: Dispatch<SetStateAction<IGameTitle>>;
  getPageProgress: IPageProgress[];
  setGetPageProgress: Dispatch<SetStateAction<IPageProgress[]>>;
  getCurrentPageState: number;
  setCurrentPageState: Dispatch<SetStateAction<number>>;
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}

// Payment Order
export interface IVerificationResponse {
  data: IData;
}

export interface IVerificationDataResponse {
  data: IDataCrypto;
}

export interface IData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  receipt_number: string | null;
  amount: number;
  message: string | null;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: IMetadata;
  log: ILog;
  fees: number;
  fees_split: any; // Use an appropriate type if available
  authorization: IAuthorization;
  customer: ICustomer;
  plan: any; // Use an appropriate type if available
  split: Record<string, any>; // Adjust the type based on actual data
  order_id: string | null;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: any; // Use an appropriate type if available
  source: any; // Use an appropriate type if available
  fees_breakdown: any; // Use an appropriate type if available
  connect: any; // Use an appropriate type if available
  transaction_date: string;
  plan_object: Record<string, any>; // Adjust the type based on actual data
  subaccount: Record<string, any>; // Adjust the type based on actual data
}
export interface IDataCrypto {
  order: IOrder;
  onChainOrder: any[];
}
export interface IOrder {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  houseNo: string;
  streetName: string;
  town: string;
  state: string;
  zip: string;
  phone: string;
  additionalInfo: string;
  paymentType: string;
  totalAmount: number;
  email: string;
  GamePackageAndIds: IGamePackageIDs[];
  transactionHash?: string;
  createdAt?: string;
}

export interface IShopCheckoutAreaForm {
  order: IOrder;
  setOrder: Dispatch<SetStateAction<IOrder>>;
}

export interface IMetadata {
  saleType: string;
  custom_fields: ICustomField[];
}

export interface ICustomField {
  gameTitle: string;
  id: string;
  price: string;
  value: string;
}

export interface ILog {
  start_time: number;
  time_spent: number;
  attempts: number;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: any[]; // Use an appropriate type if available
  history: IHistory[];
}

export interface IHistory {
  type: string;
  message: string;
  time: number;
}

export interface IAuthorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: boolean;
  signature: string;
  account_name: string | null;
  receiver_bank_account_number: string | null;
  receiver_bank: string | null;
}

export interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  phone: string;
  metadata: any; // Use an appropriate type if available
  risk_action: string;
  international_format_phone: string | null;
}
