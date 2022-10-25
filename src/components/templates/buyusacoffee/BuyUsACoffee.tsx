import React, { FC } from 'react';
import { useDebounce } from 'use-debounce';
import {
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useAccount,
} from 'wagmi'
import { utils } from 'ethers';
import { useForm } from 'react-hook-form'
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Center,
  useToast,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  ModalFooter,
  Link,
} from '@chakra-ui/react'
import Chains from 'components/modules/Chains/Chains';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { IBuyUsACoffee } from './types';

const BuyUsACoffee: FC<IBuyUsACoffee> = ({ balance }) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const toast = useToast();
  const [usdPrice ,setUsdPrice] = React.useState<any>();

  const [to] = React.useState<any>(process.env.NEXT_PUBLIC_REFER_ADDRESS);
  const [debouncedTo] = useDebounce(to, 500);
  const [amount, setAmount] = React.useState('');
  const [debouncedValue] = useDebounce(amount, 500);

  const [transactionAmount, setTransactionAmount] = React.useState('');
  const [transactionReciver, setTransactionReciever] = React.useState('');

  // Transaction Config
  const [chainName, setChainName] = React.useState("Ethereum");
  const [nativeTokenSymbol, setNativeTokenSymbol] = React.useState("ETH");
  const [chainUrl, setChainUrl] = React.useState("");
  const [addressUrl, setAddressUrl] = React.useState("");

  const OverlayOne = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  );
  const { isOpen: isOpenTransaction, onOpen: onOpenTransaction, onClose: onCloseTransaction } = useDisclosure();
  const [overlayOne, setOverlayOne] = React.useState(<OverlayOne />);

  // value: debouncedValue ? utils.parseEther(debouncedValue) : undefined,
  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedValue ? utils.parseEther(debouncedValue) : undefined,
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
    chainId: chain?.id,
  });
  const { data, sendTransaction } = useSendTransaction({
    ...config,
    request: config.request,
    onSuccess() {
      setTransactionAmount(amount);
      setTransactionReciever(to);
      setOverlayOne(<OverlayOne />);
      onOpenTransaction();
      setAmount('');
    }
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 0,
    chainId: chain?.id,
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

  const {
    handleSubmit,
  } = useForm();

  const handleAmmount = (amountadded: any) => {
    // symbols \D /+_
    const lettersWhiteSymbols = /[a-zA-Z|\s|~`!@#$%^&*()=_|+|?></"';:*|-]/;
    const dotCheck = /^\./;
    const doubledots = /([.])[\s\S]*?\1/;
    const slashCheck = /^[\\][\\ ]*$/gm;
    if (lettersWhiteSymbols.test(amountadded) || dotCheck.test(amountadded) || slashCheck.test(amountadded) || doubledots.test(amountadded)) {
      toast({
        title: 'Oops, something is wrong...',
        description: 'Amount Error, Only Numbers',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    } else {
      setAmount(amountadded)
    }
  };


  React.useEffect(() => {
    Chains.filter((chains:any) => {
      if (chains.id === chain?.id) {
        setChainName(chains.name);
        setNativeTokenSymbol(chains.nativeCurrency.symbol);
        setChainUrl(`${chains.blockExplorers.default.url}/tx/`);
        setAddressUrl(`${chains.blockExplorers.default.url}/address/`);
      }
    });

    if (address) {
      fetch('/api/getnative')
        .then((res) => res.json())
        .then((data) => {
          setUsdPrice((Number(data.usd) / 1e18).toFixed(2))
        });
    };
  }, [nativeTokenSymbol, data, balance]);

  return (
    <>
      {address ?
        <form onSubmit={
          handleSubmit(() => sendTransaction?.())
        }>
          <Center>
            <Text fontSize='4xl'>Buy Us A Coffee ({nativeTokenSymbol})</Text>
          </Center>
          <Text mt={5}></Text>
          <Center>
            <Text>Balance: {(Number(balance.balance) / 1e18).toFixed(3)} {nativeTokenSymbol} ${usdPrice}</Text>
          </Center>
          <FormControl isRequired>
            <Center>
              <FormLabel>Amount</FormLabel>
            </Center>
            <Center>
              <Input
                id={amount}
                min={0.0001}
                onChange={(e) => handleAmmount(e.target.value)}
                placeholder="0.0001"
                value={amount}
                w={250}
              />
            </Center>
          </FormControl>
          <Center>
            <Button mt={4} colorScheme='teal' type="submit" disabled={isLoading || !sendTransaction || !to || !amount}>
              {isLoading ? 'Sending... Thanks' : 'Buy'}
            </Button>
          </Center>
        </form>
        :
        <Center>
          <Text>Please Connect Your Wallet</Text>
        </Center>
      }

      {
        isSuccess && (
          <>
            <Text mt={5}></Text>
            <Button
              onClick={onOpenTransaction}
            >Last Transaction</Button>
            <Modal isCentered isOpen={isOpenTransaction} onClose={onCloseTransaction} size="xl">
              {overlayOne}
              <ModalContent>
                <ModalHeader>
                  Buy Us A Coffee
                  <CheckCircleIcon ml={2} color="green.500" />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                  <Divider orientation='horizontal' />
                  <Text mt={4}></Text>
                  <Center>
                    <Text fontSize='2xl'>Transaction Details</Text>
                  </Center>
                  <Text fontSize='2xl'>Thank You</Text>
                  <Center>
                    <Text mb={2}></Text>
                    <Text>Sent Successfully <CheckCircleIcon ml={1} color="green.500" /></Text>
                  </Center>

                  <Text mt={6}></Text>
                  <Text>
                    Reciever:{' '}
                    <Link color='teal.500' href={`${addressUrl}${transactionReciver}`} isExternal>
                      {transactionReciver}
                    </Link>
                  </Text>
                  <Text>
                    You:{' '}
                    <Link color='teal.500' href={`${addressUrl}${address}`} isExternal>
                      {address}
                    </Link>
                  </Text>
                  <Text>Amount: {transactionAmount} {nativeTokenSymbol}</Text>
                  <Text>
                    Transaction Hash:{' '}
                    <Link color='teal.500' href={`${chainUrl}${data?.hash}`} isExternal>
                      {chainName}{' '}Block Explorer
                    </Link>
                  </Text>
                  <Text>Network Name: {chainName}</Text>
                  <Text>Chain ID: {chain?.id}</Text>

                  <Text mt={5}></Text>
                  <Divider orientation='horizontal' />

                </ModalBody>
                <ModalFooter>
                  <Text>Phoenix Grow Team</Text>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      }
    </>
  )
}

export default BuyUsACoffee;
