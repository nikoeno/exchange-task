import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getTransferById } from "../api";
import { TransferResult } from "../api/types";

import styles from "./success-transfer.$transferId.module.css";

const SuccessfulTransfer = () => {
  const { transferId } = Route.useParams();
  const [transferSuccessResult, setTransferSuccessResult] =
    useState<TransferResult | null>(null);

  useEffect(() => {
    const fetchTransferResult = async () => {
      const transferResult = await getTransferById(transferId);

      if (transferResult.success) {
        setTransferSuccessResult(transferResult.data);
      }
    };
    fetchTransferResult();
  }, [transferId]);

  return (
    <div className={styles.wrapper}>
      {transferSuccessResult && (
        <>
          <h1 className={styles.title}>Transfer successful</h1>
          <table className={styles.successResult}>
            <tr>
              <td>Fee:</td>
              <td>
                {transferSuccessResult.fee} {transferSuccessResult.fromCurrency}
              </td>
            </tr>
            <tr>
              <td>From amount: </td>
              <td>
                {transferSuccessResult.fromAmount}{" "}
                {transferSuccessResult.fromCurrency}
              </td>
            </tr>
            <tr>
              <td>Fo amount: </td>
              <td>
                {transferSuccessResult.toAmount}{" "}
                {transferSuccessResult.toCurrency}
              </td>
            </tr>
            <tr>
              <td>Rate: </td>
              <td>{transferSuccessResult.rate}</td>
            </tr>
          </table>
        </>
      )}
    </div>
  );
};

export const Route = createLazyFileRoute("/success-transfer/$transferId")({
  component: SuccessfulTransfer,
});
