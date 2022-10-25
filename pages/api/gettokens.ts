import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import Chains from 'components/modules/Chains/Chains';
import { EvmAddress } from '@moralisweb3/evm-utils';
import getErc20LogoAddress from 'utils/getErc20LogoAddress';

export default async function handler(req: any, res: any) {
    const session = await getSession(res);
    let chainName: any;

    if (!session?.user.address) {
        return { props: { error: 'Connect your wallet first' } };
    }

    Chains.filter((chains: any) => {
        if (chains.id === session?.user.chainId) {
            chainName = chains.logoName
        }
    })

    try {
        await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

        if (!session?.user.address) {
            return (res.status(400).json('Connect your wallet first'));
        }

        const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
            address: session?.user.address,
            chain: session?.user.chainId,
        });

        const tokensWithLogosAdded = tokens.toJSON().map((token) => ({
            ...token,
            token: {
                ...token.token,
                logo: getErc20LogoAddress({
                    blockchain: chainName,
                    address: EvmAddress.create(token.token?.contractAddress || '').checksum,
                }),
            },
        }));

        res.status(200).json(tokensWithLogosAdded)
    } catch (error) {
        res.status(400).json({ error });
        console.error(error);
    }
}