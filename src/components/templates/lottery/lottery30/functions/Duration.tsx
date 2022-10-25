import { useContractRead, useNetwork } from 'wagmi';
import { useToast } from '@chakra-ui/react';
import lotteryAbi from '../LotteryAbi';
import { utils } from 'ethers';

const Duration = () => {
  const { chain } = useNetwork();
  const toast = useToast();
  const contractAddress = process.env.NEXT_PUBLIC_LOTTERY_30;

  const { data: duration} = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'duration',
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
      Duration: {duration && Number(duration)}
    </>
  );
};

export default Duration;
