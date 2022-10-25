import { useContractRead, useNetwork } from 'wagmi';
import { Box, Flex, Heading, Spacer, Text, useToast } from '@chakra-ui/react';
import lotteryAbi from './LotteryAbi';
import CountDown from 'react-countdown';
import React from 'react';

const Timer = () => {
  const { chain } = useNetwork();
  const toast = useToast();
  const contractAddress = process.env.NEXT_PUBLIC_LOTTERY_DAY;

  const { data } = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'expiration',
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

  type uiRInt = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  };

  const uiR = ({ days, hours, minutes, seconds, completed }: uiRInt) => {
    if (completed) {
      return (
        <>
          <Heading fontSize={15} color='red.500'>Tickets Sale is now closed for this draw</Heading>
          <Flex>
            <Box p="4" borderRadius={5} w='110px' borderWidth={2} borderColor='teal.500'>
              <Text textAlign='center' >
                {days}
              </Text>
              <Text textAlign='center' >Days</Text>
            </Box>

            <Spacer />
            <Box p="4" w='110px' borderRadius={5} borderWidth={2} borderColor='teal.500'>
              <Text textAlign='center' >
                {hours}
              </Text>
              <Text textAlign='center'>Hours</Text>
            </Box>

            <Spacer />

            <Box p="4" w='110px' borderRadius={5} borderWidth={2} borderColor='teal.500'>
              <Text textAlign='center'>
                {minutes}
              </Text>
              <Text textAlign='center'>Minutes</Text>
            </Box>

            <Spacer />

            <Box p="4" w='110px' borderRadius={5} borderWidth={2} borderColor='teal.500'>
              <Text textAlign='center' >
                {seconds}
              </Text>
              <Text textAlign='center'>Seconds</Text>
            </Box>
          </Flex>
        </>
      );
    } else {
      return (
        <>
          <Flex>
            <Box p="4" borderRadius={5} w='110px' borderWidth={2} borderColor='teal.500'>
              <Text textAlign='center' >
                {days}
              </Text>
              <Text textAlign='center' >Days</Text>
            </Box>

            <Spacer />
            <Box p="4" w='110px' borderRadius={5} borderWidth={2} borderColor='teal.500'>
              <Text textAlign='center' >
                {hours}
              </Text>
              <Text textAlign='center'>Hours</Text>
            </Box>

            <Spacer />

            <Box p="4" w='110px' borderRadius={5} borderWidth={2} borderColor='teal.500'>
              <Text textAlign='center'>
                {minutes}
              </Text>
              <Text textAlign='center'>Minutes</Text>
            </Box>

            <Spacer />

            <Box p="4" w='110px' borderRadius={5} borderWidth={2} borderColor='teal.500'>
              <Text textAlign='center' >
                {seconds}
              </Text>
              <Text textAlign='center'>Seconds</Text>
            </Box>
          </Flex>
        </>
      );
    }
  };

  return <>{<CountDown date={new Date(Number(data) * 1000)} renderer={uiR} />}</>;
};

export default Timer;
