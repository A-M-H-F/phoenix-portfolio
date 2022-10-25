import { useContractRead, useNetwork } from 'wagmi';
import { useToast } from '@chakra-ui/react';
import lotteryAbi from '../LotteryAbi';
import { utils } from 'ethers';

const CurrentWinningReward = () => {
  const { chain } = useNetwork();
  const toast = useToast();
  const contractAddress = process.env.NEXT_PUBLIC_LOTTERY_DAY;

  const { data: CurrentWinningReward } = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'CurrentWinningReward',
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
      CurrentWinningReward (Pool): {CurrentWinningReward && utils.formatEther(String(CurrentWinningReward))} Matic
    </>
  );
};

export default CurrentWinningReward;
