type NativeBalance =
  | {
    balance: string | number;
  }
  | {
    balance?: number;
  };
export interface ILotteryDay {
  balance?: NativeBalance;
  error?: string;
}
