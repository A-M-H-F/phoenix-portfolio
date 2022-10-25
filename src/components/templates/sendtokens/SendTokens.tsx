import React, { FC } from 'react';
import { ISendTokenBalances } from './types';
import {
  useNetwork,
  useAccount,
} from 'wagmi'
import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useMoralis, useWeb3Transfer } from "react-moralis";
import Moralis from 'moralis-v1';
import { useForm } from 'react-hook-form';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Chains from 'components/modules/Chains/Chains';

const SendTokens: FC<ISendTokenBalances> = ({ balances }) => {
  const { chain } = useNetwork();
  const { address, connector } = useAccount();
  const toast = useToast();

  const [providerName, setProviderName] = React.useState<any>();

  const [tokenName, setTokenName] = React.useState('');
  const [tokenBalance, setTokenBalance] = React.useState('');
  const [tokenAddress, setTokenAddress] = React.useState('');

  const [tokenSymbol, setTokenSymbol] = React.useState('');
  const [tokenDecimals, setTokenDecimals] = React.useState(0);

  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [to, setTo] = React.useState('');

  const { authenticate, isAuthenticated, enableWeb3 } = useMoralis();

  // Transaction Config
  const [chainName, setChainName] = React.useState("Ethereum");
  const [chainUrl, setChainUrl] = React.useState("");
  const [addressUrl, setAddressUrl] = React.useState("");

  const [transactionData, setTransactionData] = React.useState<any>();
  const [transactionAmount, setTransactionAmount] = React.useState<any>('');
  const [transactionReciver, setTransactionReciever] = React.useState('');

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

  const login = async (provider: any) => {
    if (!isAuthenticated) {
      // await enableWeb3({ throwOnError: true, provider });

      await authenticate({ signingMessage: "I'm Not A Robot, Log in using Phoenix Grow Portfolio App", provider: providerName, chainId: chain?.id })
        .then(function (user) {
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

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
      setTokenAmount(amountadded)
    }
  };

  const { fetch, error, isFetching } = useWeb3Transfer({
    type: "erc20",
    amount: tokenAmount ? Moralis.Units.Token(tokenAmount, tokenDecimals) : undefined,
    receiver: to,
    contractAddress: tokenAddress,
  });
  const transferT = async (provider: any) => {
    if (tokenAmount <= 0) {
      toast({
        title: 'Oops, something is wrong...',
        description: 'Token amount should not be 0',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
      return;
    }
    try {
      await enableWeb3({ throwOnError: true, provider });
      await fetch({
        throwOnError: true,
        onSuccess: (data) => {
          toast({
            title: 'Success',
            description: 'Success',
            status: 'success',
            position: 'top-right',
            isClosable: true,
          });
          setOverlayOne(<OverlayOne />);
          setTransactionAmount(tokenAmount);
          setTransactionReciever(to);
          setTransactionData(data);
          setTokenAmount(0);
          onOpenTransaction();
          setTo('')
        }
      })
    } catch (error) {
      toast({
        title: 'Oops, something is wrong...',
        description: (error as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  }

  const {
    handleSubmit,
  } = useForm();

  React.useEffect(() => {
    if (connector?.name === "MetaMask") {
      setProviderName('metamask')
    } if (connector?.name === "Coinbase Wallet") {
      setProviderName('coinbase')
    } if (connector?.name === "WalletConnect") {
      setProviderName('walletconnect')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (tokenName) {
      balances?.map(({ token, value }) => {
        if (tokenName === token?.name) {
          setTokenAddress(token?.contractAddress);
          setTokenBalance(value);
          setTokenSymbol(token?.symbol);
          setTokenDecimals(token?.decimals);
        }
      })
    };
    Chains.filter((chains:any) => {
      if (chains.id === chain?.id) {
        setChainName(chains.name);
        setChainUrl(`${chains.blockExplorers.default.url}/tx/`);
        setAddressUrl(`${chains.blockExplorers.default.url}/address/`);
      }
    });
  }, [isAuthenticated, address, tokenName, providerName, balances]);

  return (
    <>
      {address && isAuthenticated ?
        <form onSubmit={
          handleSubmit(() => transferT?.(providerName))
        }>
          <Center>
            <Text>Send Tokens</Text>
          </Center>
          <Divider mt={2} mb={2} />
          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <Text>Balance: {tokenName !== '' ? tokenBalance : 0} {tokenName !== '' ? tokenSymbol : ''}</Text>
            <Flex>
              <Input
                id={tokenName}
                min={0.0001}
                onChange={(e) => handleAmmount(e.target.value)}
                placeholder="0.0001"
                value={tokenAmount}
              />
              <Select placeholder='Select Token' onChange={(e) => setTokenName(e.target.value)} w={200}>
                {balances?.map(({ token }, key) => (
                  <option key={key} value={token?.name}>{token?.name} ${token?.symbol}</option>
                ))}
              </Select>
            </Flex>

            <FormLabel htmlFor='reciever' mt={2}>To</FormLabel>
            <Input
              id='reciever'
              onChange={(e) => setTo(e.target.value)}
              placeholder="0x29B3...2cc5"
              value={to}
            />
          </FormControl>
          <Button mt={4} colorScheme='teal' type="submit" disabled={isFetching || tokenName === ''}>
            {isFetching ? 'Sending...' : 'Send'}
          </Button>
        </form>
        : address && connector && connector.name !== 'Coinbase Wallet' ?
          <Center>
            <Button onClick={() => login(providerName)}>I'm Not A Robot</Button>
          </Center>
          : address && connector && connector.name === 'Coinbase Wallet' ?
            <Center>
              <Text>Coinbase Wallet is not supported yet</Text>
            </Center>
            :
            <Center>
              <Text>Please Connect Your Wallet</Text>
            </Center>
      }

      {transactionData && transactionData !== '' && (
        <>
          <Text mt={5}></Text>
          <Button
            onClick={onOpenTransaction}
          >Last Transaction</Button>
          <Modal isCentered isOpen={isOpenTransaction} onClose={onCloseTransaction} size="xl">
            {overlayOne}
            <ModalContent>
              <ModalHeader>
                Send Tokens
                <CheckCircleIcon ml={2} color="green.500" />
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>

                <Divider orientation='horizontal' />
                <Text mt={4}></Text>
                <Center>
                  <Text>Transaction Details</Text>
                </Center>
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
                <Text>Amount: {transactionAmount} {tokenSymbol}</Text>
                <Text>
                  Transaction Hash:{' '}
                  <Link color='teal.500' href={`${chainUrl}${transactionData?.hash}`} isExternal>
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

export default SendTokens;
