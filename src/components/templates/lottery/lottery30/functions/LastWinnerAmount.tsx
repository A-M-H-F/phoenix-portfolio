import { useContractRead, useNetwork, useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { Button, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import lotteryAbi from '../LotteryAbi';
import { utils } from 'ethers';
import React from 'react';

const LastWinnerAmount = () => {
  const { chain } = useNetwork();
  const toast = useToast();

  const contractAddress = process.env.NEXT_PUBLIC_LOTTERY_30;

  type lastWinnerProps = {
    data: any;
  };
  const { data : lastWinnerAmount }: lastWinnerProps = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'lastWinnerAmount',
    watch: true,
    isDataEqual: (prev: any, next: any) => prev === next,
    onError(error: any) {
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    },
  });

  return (
    <>
      <Text>Last Draw Winnings Amount: {lastWinnerAmount && Number(utils.formatEther(String(lastWinnerAmount)))} MATIC</Text>
    </>
  );
};

export default LastWinnerAmount;
