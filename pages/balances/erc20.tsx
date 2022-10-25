import { Default } from 'components/layouts/Default';
import { EvmAddress } from '@moralisweb3/evm-utils';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import getErc20LogoAddress from 'utils/getErc20LogoAddress';
import Moralis from 'moralis';
import { ERC20Balances, IERC20Balances } from 'components/templates/balances/ERC20';
import Chains from 'components/modules/Chains/Chains';
import React from 'react';

const ERC20: NextPage<IERC20Balances> = (props) => {
  return (
    <Default pageName="ERC20 Balances">
      <ERC20Balances {...props} />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let chainName : any;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  if (!session?.user.address) {
    return { props: { error: 'Connect your wallet first' } };
  }

  Chains.filter((chains:any) => {
    if (chains.id === session?.user.chainId) {
      chainName = chains.logoName
    }
  })

  const balances = await Moralis.EvmApi.token.getWalletTokenBalances({
    address: session?.user.address,
    chain: session?.user.chainId,
  });

  const tokensWithLogosAdded = balances.toJSON().map((balance) => ({
    ...balance,
    token: {
      ...balance.token,
      logo: getErc20LogoAddress({
        blockchain: chainName,
        address: EvmAddress.create(balance.token?.contractAddress || '').checksum,
      }),
    },
  }));

  return {
    props: {
      balances: JSON.parse(JSON.stringify(tokensWithLogosAdded)),
    },
  };
};

export default ERC20;
