type NativeBalance =
  | {
    balance: string | number;
  }
  | {
    balance?: number | any;
  };
export interface IBuyMeACoffee {
  balance?: NativeBalance | any;
  error?: string;
}
