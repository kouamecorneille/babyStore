import { Store } from "./Ishop";

export interface Token {
  refresh: string;
  access: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  delivery_adresse:string;
  is_active: boolean;
}



export interface UserApiResponse {
  refresh: string;
  access: string;
  user: User;
  shop?: Store;
}

