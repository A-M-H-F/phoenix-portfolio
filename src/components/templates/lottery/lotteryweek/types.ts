type NativeBalance =
  | {
    balance: string | number;
  }
  | {
    balance?: number;
  };
export interface ILotteryWeek {
  balance?: NativeBalance;
  error?: string;
}
