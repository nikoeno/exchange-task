import { Account } from "../lib/types/account";
import { ExchangeRate } from "../lib/types/exchangeRate";
import { DEFAULT_EXCHANGE_RATE, EXCHANGE_FEE } from "./constants";
import { ServerEmulator } from "./serverEmulator";
import { TransferResult, Result } from "./types";
import { nanoid } from "nanoid";

export const getExchangeRates = async (): Promise<Result<ExchangeRate>> => {
  try {
    const response = await fetch("/exchange-rates.json");
    const result = await response.json();

    return {
      success: true,
      data: result as ExchangeRate,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to fetch exchange rates",
    };
  }
};

export const getAccounts = async (): Promise<Result<Account[]>> => {
  try {
    const response = await fetch("/accounts.json");
    const result = await response.json();

    return { success: true, data: result as Account[] };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to fetch user accounts",
    };
  }
};

const roundUpToTwoDigits = (num: number) => Math.floor(num * 100) / 100;

// this logic should be moved to backend. We're simulating it only for demonstration
export const sendMoneyToAnotherAccount = async ({
  fromAccount,
  toAccount,
  amount,
}: {
  fromAccount: Account;
  toAccount: Account;
  amount: number;
}): Promise<TransferResult | Error> => {
  const exchangeRatesResult = await getExchangeRates();

  if (!exchangeRatesResult.success) {
    console.error(
      "Failed to send money to another account",
      exchangeRatesResult.error
    );

    return new Error("Failed to send money to another account");
  }
  const exchangeRateKey =
    `${fromAccount.currency}-${toAccount.currency}` as const;

  const rate =
    exchangeRatesResult.data[exchangeRateKey] ?? DEFAULT_EXCHANGE_RATE;
  const fee = roundUpToTwoDigits(amount * EXCHANGE_FEE);
  const toAmount = roundUpToTwoDigits((amount - fee) * rate);
  const result: TransferResult = {
    fee,
    fromAmount: amount,
    fromCurrency: fromAccount.currency,
    toCurrency: toAccount.currency,
    toAmount,
    rate,
    id: nanoid(),
  };

  await ServerEmulator.saveTransfer(result);

  return result;
};

export const getTransferById = async (
  id: string
): Promise<Result<TransferResult>> => {
  const result = await ServerEmulator.getTransferById(id);

  if (!result) {
    return {
      success: false,
      error: "Transfer not found",
    };
  }

  return { success: true, data: result as TransferResult };
};
