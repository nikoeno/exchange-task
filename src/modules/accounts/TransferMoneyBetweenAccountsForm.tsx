import { useCallback, useEffect, useState } from "react";
import { useNotification } from "rc-notification";
import { useNavigate } from "@tanstack/react-router";
import { useAccounts } from "./useAccounts";
import { useTransfer } from "./useTransfer";
import { Select } from "../../lib/ui/Select";
import { Input } from "../../lib/ui/Input";
import { Button } from "../../lib/ui/Button";

import styles from "./TransferMoneyBetweenAccountsForm.module.css";

export const TransferMoneyBetweenAccountsForm = () => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const {
    accounts,
    error: accountsError,
    isLoading: isAccountsLoading,
  } = useAccounts();

  const {
    error: transferError,
    isLoading: isTransferLoading,
    sendMoneyToAnotherAccount,
    successResult: transferSuccessResult,
  } = useTransfer();

  const [notice, holder] = useNotification({
    closable: true,
    duration: 0,
    style: () => ({
      alignItems: "center",
      width: "100%",
    }),
  });

  const navigate = useNavigate();

  const showErrorMessage = useCallback(
    (message: string) => {
      notice.open({
        content: message,
        styles: {
          wrapper: {
            borderBottom: "3px solid #f44336",
          },
        },
      });
    },
    [notice]
  );

  const validateFields = () => {
    const errorMessages: string[] = [];

    if (!fromAccountId) {
      errorMessages.push("Please select a from account");
    }

    if (!toAccountId) {
      errorMessages.push("Please select a to account");
    }

    if (!amount) {
      errorMessages.push("Please enter an amount");
    }

    if (amount && Number(amount) <= 0) {
      errorMessages.push(
        "Please enter a valid amount. Amount should be positive"
      );
    }

    const isFormValid = errorMessages.length === 0;

    errorMessages.forEach((message) => {
      showErrorMessage(message);
    });

    return isFormValid;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    notice.destroy();

    const isFormValid = validateFields();

    if (!isFormValid) {
      return;
    }

    sendMoneyToAnotherAccount({
      fromAccount: accounts.find((account) => account.id === fromAccountId)!,
      toAccount: accounts.find((account) => account.id === toAccountId)!,
      amount: Number(amount),
    });
  };

  const options = accounts.map((account) => ({
    id: account.id,
    name: account.name,
  }));

  useEffect(() => {
    if (transferSuccessResult) {
      navigate({
        to: "/success-transfer/$transferId",
        params: { transferId: transferSuccessResult.id },
      });
    }
  }, [transferSuccessResult, navigate]);

  useEffect(() => {
    if (transferError) {
      showErrorMessage("Failed to transfer money between user accounts");
    }

    if (accountsError) {
      showErrorMessage("Failed to get user accounts");
    }
  }, [accountsError, transferError, showErrorMessage]);

  return (
    <>
      <form onSubmit={handleFormSubmit} className={styles.transferMoneyForm}>
        <Select
          value={fromAccountId}
          onChange={setFromAccountId}
          options={options}
          label="From account"
          placeholder="Select account"
          loading={isAccountsLoading}
        />
        <Select
          value={toAccountId}
          onChange={setToAccountId}
          options={options}
          label="From account"
          placeholder="Select account"
          loading={isAccountsLoading}
        />
        <Input
          type="number"
          value={amount}
          onChange={setAmount}
          label="Amount"
          min={0}
          step={0.01}
        />
        <Button
          type="submit"
          className="submit-button"
          loading={isTransferLoading}
        >
          Transfer
        </Button>
      </form>
      {holder}
    </>
  );
};
