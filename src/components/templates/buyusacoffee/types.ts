type NativeBalance =
  | {
    balance: string | number;
  }
  | {
    balance?: number | any;
  };
export interface IBuyUsACoffee {
  balance?: NativeBalance | any;
  error?: string;
}
