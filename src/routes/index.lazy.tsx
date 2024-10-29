import { createLazyFileRoute } from "@tanstack/react-router";
import { TransferMoneyBetweenAccountsForm } from "../modules/accounts/TransferMoneyBetweenAccountsForm";

import styles from "./index.module.css";

const SendMoney = () => {
  return (
    <div className={styles.wrapper}>
      <TransferMoneyBetweenAccountsForm />
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: SendMoney,
});
