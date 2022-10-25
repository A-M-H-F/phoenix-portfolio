type NativeBalance =
  | {
    balance: string | number;
  }
  | {
    balance?: number;
  };
export interface ILotteryMonth {
  balance?: NativeBalance;
  error?: string;
}
