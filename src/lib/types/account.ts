import { Currency } from "./currency";

export interface Account {
  id: string;
  name: string;
  currency: Currency;
  balance: number;
} 