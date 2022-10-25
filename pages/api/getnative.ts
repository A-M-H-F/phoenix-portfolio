import { getSession } from 'next-auth/react';
import Moralis from 'moralis';

export default async function handler(req: any, res: any) {
    const session = await getSession(res);

    try {
        await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

        if (!session?.user.address) {
            return (res.status(400).json('Connect your wallet first'));
        }

        const balance: any = await Moralis.EvmApi.balance.getNativeBalance({
            address: session?.user.address,
            chain: session?.user.chainId,
        });

        const nativeBalance = balance.data;

        let nativeCurrency;
        if (session?.user.chainId === 0x1) { // WETH
            nativeCurrency = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
        } else if (session?.user.chainId === 0x89) { // WMATIC
            nativeCurrency = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
        } else if (session?.user.chainId === 56) { // WBNB
            nativeCurrency = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
        } else if (session?.user.chainId === 0xa86a) { // WAVAX
            nativeCurrency = "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7";
        } else if (session?.user.chainId === 0xfa) { // WFTM
            nativeCurrency = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";
        }

        if (session?.user.chainId === 5 || session?.user.chainId === 97 || session?.user.chainId === 0x13881) {
            nativeBalance.usd = 0;
        } else {
            const nativePrice: any = await Moralis.EvmApi.token.getTokenPrice({
                address: String(nativeCurrency),
                chain: session?.user.chainId,
            });

            nativeBalance.usd = nativePrice.data.usdPrice;
        }

        res.send(nativeBalance);
    } catch (error) {
        res.status(400).json({ error });
        console.error(error);
    }
}