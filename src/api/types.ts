export type SuccessResult<Response> = {
  success: true;
  data: Response;
};

export type ErrorResult = {
  success: false;
  error: string;
};

export type Result<Response> = SuccessResult<Response> | ErrorResult;

export interface TransferResult {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  fee: number;
  id: string;
}
