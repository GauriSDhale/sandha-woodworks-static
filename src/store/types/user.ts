import type { ShippingAddress } from "./order";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: ShippingAddress[];
  defaultAddressIndex: number;
}

export interface UserState {
  profile: UserProfile | null;
  isLoggedIn: boolean;
}
