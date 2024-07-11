export interface IPlanPrice {
  basic: number;
  standard: number;
  premium: number;
}

export interface IPlanTitle {
  basic: string;
  standard: string;
  premium: string;
}

export interface ILauchProspect {
  // How long will it take to launch this project to production
  basic: number;
  standard: number;
  premium: number;
}

export interface ICustomizations {
  basic: number;
  standard: number;
  premium: number;
}

export interface ILevel {
  basic: number;
  standard: number;
  premium: number;
}

export interface IHasDocumentation{
    basic: boolean;
    standard: boolean;
    premium: boolean;
}

export interface IHasAdminPanel{
    basic: boolean;
    standard: boolean;
    premium: boolean;
}