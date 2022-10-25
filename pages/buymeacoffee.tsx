import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { IBuyMeACoffee, BuyMeACoffee } from 'components/templates/buymeacoffee';
import Moralis from 'moralis';

const BuyMeACoffeePage: NextPage<IBuyMeACoffee> = (props) => {
  return (
    <Default pageName="Buy Me A Coffee">
      <BuyMeACoffee {...props} />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  if (!session?.user.address) {
    return { props: { error: 'Connect your wallet first' } };
  }

  const balance = await Moralis.EvmApi.balance.getNativeBalance({
    address: session?.user.address,
    chain: session?.user.chainId,
  });

  return {
    props: {
      balance: JSON.parse(JSON.stringify(balance)),
    },
  };
};

export default BuyMeACoffeePage;
