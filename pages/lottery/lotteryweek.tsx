import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import { ILotteryWeek, LotteryWeek } from 'components/templates/lottery/lotteryweek';
import { useNetwork } from 'wagmi';
import { Heading, Text, VStack } from '@chakra-ui/react';

const LotteryWeekPage: NextPage<ILotteryWeek> = (props) => {
  const { chain } = useNetwork();
  if (chain?.id !== 0x13881) {
    return (
      <Default pageName="30 mins Lottery">
        <VStack>
          <Heading>Weekly Lottery</Heading>
          <Text color="red.500">Please connect to Polygon Mumbai Testnet</Text>
        </VStack>
      </Default>
    );
  } else {
    return (
      <Default pageName="30 mins Lottery">
        <LotteryWeek {...props} />
      </Default>
    );
  }
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

export default LotteryWeekPage;
