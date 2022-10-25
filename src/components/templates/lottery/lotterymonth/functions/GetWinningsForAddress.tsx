import { useContractRead, useNetwork, useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { Button, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import lotteryAbi from '../LotteryAbi';
import { utils } from 'ethers';
import React from 'react';

const GetWinningsForAddress = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const toast = useToast();

  const contractAddress = process.env.NEXT_PUBLIC_LOTTERY_MONTH;

  type getWinningsForAddressProps = {
    data: any;
  };
  const { data: getWinningsForAddress }: getWinningsForAddressProps = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'getWinningsForAddress',
    args: [address],
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

  // withdraw winings contract
  const toastWithdraw = React.useRef<any>();
  type configProps = {
    config: any;
  };
  const { config }: configProps = usePrepareContractWrite({
    address: contractAddress,
    abi: lotteryAbi,
    functionName: 'WithdrawWinnings',
    chainId: chain?.id,
    args: [{}],
    onError(error) {
      console.log(error);
    },
  });
  const {write: writeWithdraw, isLoading: isLodingWithdraw } = useContractWrite({
    ...config,
    onSuccess(data) {
      toast.close(toastWithdraw.current);
      toast({
        title: 'Success',
        description: `Successfuly Withdrawn ${utils.formatEther(String(data))} MATIC`,
        status: 'success',
        position: 'top',
        isClosable: false,
      });
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  // buy tickets call
  const withdrawNow = async () => {
    if (!getWinningsForAddress) return;
    try {
      toastWithdraw.current = toast({
        title: 'Withdrawing....',
        description: `${utils.formatEther(String(getWinningsForAddress))} MATIC`,
        status: 'loading',
        position: 'top',
        duration: 20000,
        isClosable: false,
      });
      const data = writeWithdraw?.();
    } catch (error) {
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <>
      {getWinningsForAddress && getWinningsForAddress > 0 ? (
        <VStack mb={10}>
          <Heading color='teal.500'>You Won Congrats!</Heading>
          <Text>Total Winings: {utils.formatEther(String(getWinningsForAddress))} MATIC</Text>
          <Button color='green.500' onClick={() => withdrawNow()}>{isLodingWithdraw ? 'Withdrawing...' : 'Claim Your Winnings'}</Button>
        </VStack>
      ) : null}
    </>
  );
};

export default GetWinningsForAddress;
