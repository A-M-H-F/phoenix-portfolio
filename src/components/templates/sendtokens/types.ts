type Erc20Value =
  | {
      value: string;
      token: {
        contractAddress: string;
        chain: string | number;
        decimals: number;
        name: string;
        symbol: string;
        logo?: string | null | undefined;
        logoHash?: string | null | undefined;
        thumbnail?: string | null | undefined;
      };
    }
  | {
      value: string;
      token?: undefined;
    };
export interface ISendTokenBalances {
  balances?: Erc20Value[];
  error?: string;
}
