import { useContractRead, useNetwork } from 'wagmi';
import { useToast } from '@chakra-ui/react';
import lotteryAbi from '../LotteryAbi';

const IsWinner = () => {
  const { chain } = useNetwork();
  const toast = useToast();
  const contractAddress = process.env.NEXT_PUBLIC_LOTTERY_DAY;

  const { data } = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'IsWinner',
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
      IsWinner: {data && data ? 'True' : 'False'}
    </>
  );
};

export default IsWinner;
