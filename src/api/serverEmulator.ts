import { TransferResult } from "./types";

const LOCAL_STORAGE_KEY = "server-emulator-transfers";

export const ServerEmulator = {
  // async actually no needed here. We use it just to return promise
  getTransferById: async (id: string) => {
    const items = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!items) {
      return null;
    }

    const transfers = JSON.parse(items) as TransferResult[];

    return transfers.find((transfer: TransferResult) => transfer.id === id);
  },
  // async actually no needed here. We use it just to return promise
  saveTransfer: async (transfer: TransferResult) => {
    const items = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!items) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([transfer]));
    } else {
      const transfers = JSON.parse(items) as TransferResult[];
      transfers.push(transfer);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transfers));
    }
  },
};
