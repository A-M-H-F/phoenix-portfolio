import { useContractRead, useNetwork, useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { Button, Center, Heading, HStack, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import lotteryAbi from '../LotteryAbi';
import { utils } from 'ethers';
import React from 'react';

const AdminSettings = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const toast = useToast();
  const contractAddress = process.env.NEXT_PUBLIC_LOTTERY_MONTH;

  // is Admin
  type adminProps = {
    data: any;
  };
  const { data: admin }: adminProps = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'lotteryOperator',
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

  // total comissions
  type comissionProps = {
    data: any;
  };
  const { data: totalComission }: comissionProps = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'operatorTotalCommission',
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

  // WithdrawCommission contract
  const toastwithdraw = React.useRef<any>();
  type configProps = {
    config: any;
  };
  const { config: withdrawConfig }: configProps = usePrepareContractWrite({
    address: contractAddress,
    abi: lotteryAbi,
    functionName: 'WithdrawCommission',
    chainId: chain?.id,
    args: [{}],
    onError(error) {
      toast.close(toastwithdraw.current);
      console.log(error);
    },
  });
  const { write: writeWithdrawCommission, isLoading: isLoadingwithdrawcommission } = useContractWrite({
    ...withdrawConfig,
    onSuccess(data) {
      toast.close(toastwithdraw.current);
      toast({
        title: 'Success',
        description: `Successfuly Withdrawn Comissions`,
        status: 'success',
        position: 'top',
        isClosable: false,
      });
      console.log(data);
    },
    onError(error) {
      toast.close(toastwithdraw.current);
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    },
  });
  // withdrawCommissionNow call
  const withdrawCommissionNow = async () => {
    if (!totalComission) return;
    try {
      const data = writeWithdrawCommission?.();

      toastwithdraw.current = toast({
        title: 'Claiming...',
        description: `Total commissions: ${utils.formatEther(String(totalComission))}`,
        status: 'loading',
        position: 'top',
        duration: 20000,
        isClosable: false,
      });
    } catch (error) {
        toast.close(toastwithdraw.current);
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  // refund all users contract
  const toastrefunding = React.useRef<any>();
  type refundProps = {
    config: any;
  };
  const { config: refundconfig }: refundProps = usePrepareContractWrite({
    address: contractAddress,
    abi: lotteryAbi,
    functionName: 'RefundAll',
    chainId: chain?.id,
    args: [{}],
    onError(error) {
      toast.close(toastrefunding.current);
      console.log(error);
    },
  });
  const { write: writerefundAll, isLoading: isLoadingrefundAll } = useContractWrite({
    ...refundconfig,
    onSuccess(data) {
      toast.close(toastrefunding.current);
      toast({
        title: 'Success',
        description: `Successfuly Refunded All Users`,
        status: 'success',
        position: 'top',
        isClosable: false,
      });
      console.log(data);
    },
    onError(error) {
      toast.close(toastrefunding.current);
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    },
  });
  // refund all users call
  const refundUsersNow = async () => {
    try {
      const data = writerefundAll?.();

      toastrefunding.current = toast({
        title: 'Refunding...',
        description: ``,
        status: 'loading',
        position: 'top',
        duration: 20000,
        isClosable: false,
      });
    } catch (error) {
      toast.close(toastrefunding.current);
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  // DrawWinnerTicket contract
  const toastDraw = React.useRef<any>();
  type drawWinnerProps = {
    config: any;
  };
  const { config: drawconfig }: drawWinnerProps = usePrepareContractWrite({
    address: contractAddress,
    abi: lotteryAbi,
    functionName: 'DrawWinnerTicket',
    chainId: chain?.id,
    args: [{}],
    onError(error) {
        toast.close(toastDraw.current);
      console.log(error);
    },
  });
  const { write: writedrawWinner, isLoading: isLoadingdrawWinner } = useContractWrite({
    ...drawconfig,
    onSuccess(data) {
      toast.close(toastDraw.current);
      toast({
        title: 'Success',
        description: `Successfuly Drawn A Winner`,
        status: 'success',
        position: 'top',
        isClosable: false,
      });
      console.log(data);
    },
    onError(error) {
      toast.close(toastDraw.current);
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    },
  });
  // refund all users call
  const drawAWinnerNow = async () => {
    try {
      const data = writedrawWinner?.();

      toastDraw.current = toast({
        title: 'Drawing a winner...',
        description: ``,
        status: 'loading',
        position: 'top',
        duration: 20000,
        isClosable: false,
      });
    } catch (error) {
        toast.close(toastDraw.current);
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  // restart draw contract
  const toastRestartDraw = React.useRef<any>();
  type restartDrawProps = {
    config: any;
  };
  const { config: restartconfig }: restartDrawProps = usePrepareContractWrite({
    address: contractAddress,
    abi: lotteryAbi,
    functionName: 'restartDraw',
    chainId: chain?.id,
    args: [{}],
    onError(error) {
      toast.close(toastRestartDraw.current);
      console.log(error);
    },
  });
  const { write: writeRestartDraw, isLoading: isLoadingRestartDraw } = useContractWrite({
    ...restartconfig,
    onSuccess(data) {
      toast.close(toastRestartDraw.current);
      toast({
        title: 'Success',
        description: `Successfuly restarted this draw`,
        status: 'success',
        position: 'top',
        isClosable: false,
      });
      console.log(data);
    },
    onError(error) {
      toast.close(toastRestartDraw.current);
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    },
  });
  // restart draw call
  const restartDrawNow = async () => {
    try {
      const data = writeRestartDraw?.();

      toastRestartDraw.current = toast({
        title: 'Restarting This Draw...',
        description: ``,
        status: 'loading',
        position: 'top',
        duration: 20000,
        isClosable: false,
      });
    } catch (error) {
        toast.close(toastRestartDraw.current);
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
      {address === admin && (
        <VStack mb={15}>
          <Heading>Admin Setting</Heading>
          <VStack>
            <Text>Admin Address: {admin}</Text>
            <Text>Contract Address: {contractAddress}</Text>

            <Text color='red.500'>Total Comissions: {totalComission && utils.formatEther(String(totalComission))} Matic</Text>
          </VStack>

          <HStack>
            <Stack>
              <Button onClick={() => withdrawCommissionNow()} disabled={totalComission <= 0}>
                {isLoadingwithdrawcommission ? 'Claiming...' : 'Claim Commissions'}
              </Button>
            </Stack>

            <Stack>
              <Button color='black.500' backgroundColor='pink.500' onClick={() => refundUsersNow()}>{isLoadingrefundAll ? 'Refunding...' : 'Refund All Users'}</Button>
            </Stack>
          </HStack>

          <HStack>
            <Stack>
              <Button onClick={() => drawAWinnerNow()} color='black.500' backgroundColor='teal.500'>
                {isLoadingdrawWinner ? 'Drawing...' : 'Draw Winner Ticket'}
              </Button>
            </Stack>

            <Stack>
              <Button color='black.500' backgroundColor='green.500' onClick={() => restartDrawNow()}>{isLoadingRestartDraw ? 'Restarting...' : 'Restart This Draw'}</Button>
            </Stack>
          </HStack>
        </VStack>
      )}
    </>
  );
};

export default AdminSettings;
