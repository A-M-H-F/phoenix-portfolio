type NativeBalance =
  | {
    balance: string | number;
  }
  | {
    balance?: number | any;
  };
export interface INativeBalances {
  balance?: NativeBalance | any;
  error?: string;
}
