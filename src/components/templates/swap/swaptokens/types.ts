type NativeBalance =
  | {
    balance: string | number;
  }
  | {
    balance?: number | any;
  };
export interface ISwapTokens {
  balance?: NativeBalance | any;
  error?: string;
}
