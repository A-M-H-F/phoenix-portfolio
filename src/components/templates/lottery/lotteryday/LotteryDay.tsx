import React, { FC, useEffect } from 'react';
import { useNetwork, useContractRead, usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi';
import { ILotteryDay } from './types';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Thead,
  Tr,
  useToast,
  VStack,
} from '@chakra-ui/react';
import lotteryAbi from './LotteryAbi';
import { utils } from 'ethers';
import Timer from './CountDown';
import GetWinningsForAddress from './functions/GetWinningsForAddress';
import AdminSettings from './functions/Admin';

const LotteryDay: FC<ILotteryDay> = ({ balance }: any) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const toast = useToast();
  const contractAddress = process.env.NEXT_PUBLIC_LOTTERY_DAY;

  const [ticketsQuantity, setTicketsQuantity] = React.useState<number>();
  const [addressTickets, setAddressTickets] = React.useState<number>();

  type ContractFunc = {
    data: any;
  };

  // ticket price
  const { data: ticketprice }: ContractFunc = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'ticketPrice',
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

  // remaing tickets
  const { data: remaingtickets }: ContractFunc = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'RemainingTickets',
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

  // expiration
  const { data: expiration }: ContractFunc = useContractRead({
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

  // get tickets
  const { data: tickets }: ContractFunc = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'getTickets',
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

  // buytickets contract
  const toastBuying = React.useRef<any>();
  type configProps = {
    config: any;
  };
  const { config }: configProps = usePrepareContractWrite({
    address: contractAddress,
    abi: lotteryAbi,
    functionName: 'BuyTickets',
    chainId: chain?.id,
    args: [
      {
        value: ticketsQuantity
          ? utils.parseEther(String(Number(utils.formatEther(ticketprice)) * ticketsQuantity))
          : undefined,
      },
    ],
    onError(error) {
      toast.close(toastBuying.current);
      console.log(error);
    },
  });
  const { data: buytickets, write: writeBuy, isLoading: isLoadingBuy } = useContractWrite({
    ...config,
    onSuccess(data) {
      toast.close(toastBuying.current);
      toast({
        title: 'Success',
        description: `Successfuly bought ${ticketsQuantity} Tickets`,
        status: 'success',
        position: 'top',
        isClosable: false,
      });
      console.log(data);
    },
    onError(error) {
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    },
  });

  // buy tickets call
  const buyTickets = async () => {
    if (!ticketprice) return;

    const price = Number(utils.formatEther(ticketprice)) * Number(ticketsQuantity);
    const balanceT = Number((Number(balance.balance) / 1e18).toFixed(3));
    if (price > balanceT) {
      toast.close(toastBuying.current);
      toast({
        title: 'Oops, something is wrong...',
        description: `You don't hold enougth MATIC`,
        status: 'error',
        position: 'top',
        isClosable: true,
      });
      return;
    }
    try {
      const data = writeBuy?.();

      toastBuying.current = toast({
        title: 'Buying....',
        description: `Buying Tickets Q: ${ticketsQuantity}`,
        status: 'loading',
        position: 'top',
        duration: 20000,
        isClosable: false,
      });
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

  // last winner
  const { data: lastWinner }: ContractFunc = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'lastWinner',
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

  // last winnings amount
  const { data: lastWinnerAmount }: ContractFunc = useContractRead({
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

  // current winning reward
  const { data: CurrentWinningReward }: ContractFunc = useContractRead({
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

  const { data: ticketCommission }: ContractFunc = useContractRead({
    address: contractAddress,
    abi: lotteryAbi,
    chainId: chain?.id,
    functionName: 'ticketCommission',
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

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;

    const numberOfAddressTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
      0,
    );
    setAddressTickets(numberOfAddressTickets);
  }, [tickets, address]);

  return (
    <>
      <AdminSettings />

      <VStack mb={5}>
        <Heading>Daily Lottery</Heading>
      </VStack>

      <Box>
        <VStack>
          <TableContainer mb={10}>
            <Table variant="simple" colorScheme="teal" borderWidth={2} borderColor="teal">
              <Thead></Thead>
              <Tbody>
                <Tr>
                  <Td>Remaing Tickets</Td>
                  <Td>{remaingtickets && Number(remaingtickets)}</Td>
                </Tr>
                <Tr>
                  <Td>Current Winning Reward (Pool)</Td>
                  {CurrentWinningReward ? <Td>{utils.formatEther(String(CurrentWinningReward))}</Td> : <Td>0</Td>}
                </Tr>
                <Tr>
                  <Td>Draw Duration</Td>
                  <Td>24 Hours</Td>
                </Tr>
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
        </VStack>

        <GetWinningsForAddress />

        <Progress size="xs" isIndeterminate colorScheme="teal" mb={5} />
        <VStack>
          {' '}
          <Timer />
        </VStack>
        <Progress size="xs" isIndeterminate colorScheme="red" mt={5} mb={10} />

        <Center>
          <Text fontSize={30}>Tickets</Text>
        </Center>
        <Center>
          <Flex>
            <Progress size="xs" w={20} flex={1} isIndeterminate colorScheme="green" mb={5} />
          </Flex>
        </Center>

        <VStack>
          <NumberInput
            defaultValue={0}
            value={ticketsQuantity}
            min={1}
            max={30}
            onChange={(e) => setTicketsQuantity(Number(e))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </VStack>
        <VStack mt={5}>
          <Button
          w={250}
            disabled={String(expiration) < String(Date.now()) || Number(remaingtickets) === 0}
            onClick={() => buyTickets()}
          >
            {isLoadingBuy ? 'Buying...' : 'Buy Tickets'}
          </Button>
        </VStack>

        <VStack mt={5}>
          <TableContainer>
            <Table variant="simple" colorScheme="teal" borderWidth={2} borderColor="teal">
              <Thead></Thead>
              <Tbody>
                <Tr>
                  <Td>Total Tickets Cost</Td>
                  <Td color="pink.500">
                    {ticketprice && ticketsQuantity && Number(utils.formatEther(String(ticketprice))) * ticketsQuantity}{' '}
                    MATIC
                  </Td>
                </Tr>
                <Tr>
                  <Td>Price/Ticket</Td>
                  {ticketprice ? <Td>{utils.formatEther(String(ticketprice))} MATIC</Td> : <Td>0</Td>}
                </Tr>
                <Tr>
                  <Td>Service Fees</Td>
                  {ticketCommission ? <Td color='red.300'>{utils.formatEther(String(ticketCommission))} MATIC</Td> : <Td>0</Td>}
                </Tr>
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
        </VStack>

        <VStack mt={10}>
          <TableContainer>
            <Table variant="simple" colorScheme="teal" borderWidth={2} borderColor="teal">
              <TableCaption>Draw Details</TableCaption>
              <Thead></Thead>
              <Tbody>
                <Tr>
                  <Td>Your Total Tickets</Td>
                  <Td color='red.500'>{addressTickets && addressTickets > 0 ? addressTickets : 0}</Td>
                </Tr>
                <Tr>
                  <Td>Last Winner</Td>
                  <Td color='green.100'>{lastWinner}</Td>
                </Tr>
                <Tr>
                  <Td>Last Draw Winnings Amount</Td>
                  <Td color='green.100'>{lastWinnerAmount && Number(utils.formatEther(String(lastWinnerAmount)))} MATIC</Td>
                </Tr>
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
        </VStack>
      </Box>
    </>
  );
};

export default LotteryDay;
