import { useEffect, useState } from "react";
import { getAccounts } from "../../api";
import { Account } from "../../lib/types/account";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);

      const accountsFetchResult = await getAccounts();

      setIsLoading(false);

      if (accountsFetchResult.success) {
        setAccounts(accountsFetchResult.data);
      } else {
        setError(accountsFetchResult.error);
        setAccounts([]);
      }
    };

    fetchAccounts();
  }, []);

  return {
    accounts,
    isLoading,
    error,
  };
};
