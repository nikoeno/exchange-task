import { useState } from "react";
import { sendMoneyToAnotherAccount as sendMoneyToAnotherAccountApi } from "../../api";
import { Account } from "../../lib/types/account";
import { TransferResult } from "../../api/types";

export const useTransfer = () => {
  const [successResult, setSuccessResult] = useState<TransferResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMoneyToAnotherAccount = async ({
    fromAccount,
    toAccount,
    amount,
  }: {
    fromAccount: Account;
    toAccount: Account;
    amount: number;
  }) => {
    setIsLoading(true);
    const result = await sendMoneyToAnotherAccountApi({
      fromAccount,
      toAccount,
      amount,
    });

    setIsLoading(false);

    if (result instanceof Error) {
      setError(result.message);
    } else {
      setSuccessResult(result);
    }
  };

  return {
    isLoading,
    error,
    successResult,
    sendMoneyToAnotherAccount,
  };
};
