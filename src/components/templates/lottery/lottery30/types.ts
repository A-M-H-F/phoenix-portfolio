type NativeBalance =
  | {
    balance: string | number;
  }
  | {
    balance?: number;
  };
export interface ILottery30 {
  balance?: NativeBalance;
  error?: string;
}
