import React, { FC } from 'react';
import {
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useAccount,
} from 'wagmi'
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
  Select,
  Flex,
  Image,
} from '@chakra-ui/react'
import Chains from 'components/modules/Chains/Chains';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { ISwapTokens } from './types';
import axios from 'axios';
import Tokens from './tokens';

const SwapTokens: FC<ISwapTokens> = ({ balance }) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const toast = useToast();
  const referrerAddress = '0x29B3F68AF3809904994B2E814e1d254506f72cc5';

  const [transactionAmount, setTransactionAmount] = React.useState('');
  const [transactionReciver, setTransactionReciever] = React.useState('');

  // Transaction Config
  const [chainName, setChainName] = React.useState("Ethereum");
  const [nativeTokenSymbol, setNativeTokenSymbol] = React.useState("ETH");
  const [nativeTokenName, setNativeTokenName] = React.useState("ETH");
  const [chainUrl, setChainUrl] = React.useState("");
  const [addressUrl, setAddressUrl] = React.useState("");
  const [nativeTokenImage, setNativeTokenImage] = React.useState("");

  const [tokens, setTokens] = React.useState<any>();

  const [tokenAmount, setTokenAmount] = React.useState(0);

  const [fromToken] = React.useState("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
  const [toToken, setToToken] = React.useState('');
  const [value, setValue] = React.useState<any>('');

  const [valueExchanged, setValueExchanged] = React.useState<any>('');
  const [valueExchangedDecimals, setValueExchangedDecimals] = React.useState(1e18);
  const [to, setTo] = React.useState('');
  const [txData, setTxData] = React.useState('');

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
      from: address,
      to: String(to),
      data: String(txData),
      value: String(value),
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
      setTransactionAmount(value);
      setTransactionReciever(to);
      setOverlayOne(<OverlayOne />);
      onOpenTransaction();
      setValue('');
      setTo('');
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
      setTokenAmount(amountadded);
      const converA = amountadded * 1E18;
      const converB = converA.toLocaleString('fullwide', { useGrouping: false });
      setValue(converB)
      setValueExchanged("");
    }
  }

  const get1Inch = async () => {
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
    const tx = await axios.get(`https://api.1inch.io/v4.0/${chain?.id}/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${value}&fromAddress=${address}&slippage=2&referrerAddress=${referrerAddress}&fee=3`);
    setTo(tx.data.tx.to);
    setTxData(tx.data.tx.data);
    setValueExchangedDecimals(Number(`1E${tx.data.toToken.decimals}`));
    setValueExchanged(tx.data.toTokenAmount);
  }

  function changeToToken(e: any) {
    setToToken(e.target.value);
    setValueExchanged("");
  }

  React.useEffect(() => {
    Chains.filter((chains:any) => {
      if (chains.id === chain?.id) {
        setChainName(chains.name);
        setNativeTokenName(chains.nativeCurrency.name);
        setNativeTokenSymbol(chains.nativeCurrency.symbol);
        setChainUrl(`${chains.blockExplorers.default.url}/tx/`);
        setAddressUrl(`${chains.blockExplorers.default.url}/address/`);
        setNativeTokenImage(chains.logo)
      }
    })

    Tokens.map((token) => {
      if (token.id === chain?.id) {
        setTokens(token.tokens);
        setToToken(token.tokens[0].address)
      }
    })
  }, [nativeTokenSymbol, nativeTokenName, data, balance]);

  console.log(balance)

  return (
    <>
      {address && chain?.id !== 5 && chain?.id !== 97 && chain?.id !== 0x13881?
        <form onSubmit={
          handleSubmit(() => sendTransaction?.())
        }>
          <Center>
            <Text fontSize='4xl'>Swap Tokens</Text>
          </Center>
          <Center>
            <Text fontSize='2xl'>3% Fee</Text>
          </Center>
          {balance && balance.balance <= 0 && (
                      <Center>
                      <Text color='red.500'>Swap is Disabled, Your {nativeTokenSymbol} balance is 0, please add some tokens & get back.</Text>
                    </Center>
          )}
          <Text mb={10}></Text>

          <FormControl isRequired>
            <Center>
              <FormLabel htmlFor='native'>Balance: {(Number(balance.balance) / 1e18).toFixed(3)} {nativeTokenSymbol}</FormLabel>
            </Center>
            <Center>
              <Flex w={350}>
                <Input
                  id={nativeTokenName}
                  min={0.0001}
                  max={(Number(balance.balance) / 1e18).toFixed(3)}
                  onChange={(e) => handleAmmount(e.target.value)}
                  placeholder='0.0001'
                  value={tokenAmount}
                  disabled={balance && balance.balance <= 0}
                />
                <Select w={300} disabled>
                  <option value={fromToken}>{nativeTokenSymbol}</option>
                </Select>
                <Image ml={2} src={nativeTokenImage} w={38} h={38} />
              </Flex>
            </Center>

            <Center>
              <Divider mt={6} mb={5} w={500} />
            </Center>

            <Center>
              <FormLabel htmlFor='erc20'>To</FormLabel>
            </Center>
            <Center>
              <Flex w={500}>
                <Button onClick={() => get1Inch()} mr={2} w={250} disabled={balance && balance.balance <= 0}>
                  Get Conversion
                </Button>
                <Input
                  value={
                    !valueExchanged
                      ? ""
                      : (valueExchanged / valueExchangedDecimals).toFixed(5)
                  }
                  disabled={true}
                />
                <Select name="toToken" w={300} value={toToken} onChange={(e) => changeToToken(e)} disabled={balance && balance.balance <= 0}>
                  {tokens && tokens.map((token: any) => (
                    <option value={token.address}>{token.symbol}</option>
                  ))}
                </Select>
              </Flex>
            </Center>

          </FormControl>

          <Center>
            {/* disabled={isLoading || !sendTransaction || !to || !tokenAmount} disabled={!valueExchanged} */}
            <Button mt={4} colorScheme='teal' type="submit" disabled={isLoading || !sendTransaction || !to || !tokenAmount}>
              {isLoading ? 'Swaping...' : 'Swap'}
            </Button>
          </Center>
        </form>
        :
          chain?.id === 5 || chain?.id === 97 || chain?.id === 0x13881 ?
            <Center>
              <Text>Please Connect To A Mainnet</Text>
            </Center>

            :
            <Center>
              <Text>Please Connect Your Wallet</Text>
            </Center>
      }

      {isSuccess && (
        <>
          <Text mt={5}></Text>
          <Button
            onClick={onOpenTransaction}
          >Last Transaction</Button>
          <Modal isCentered isOpen={isOpenTransaction} onClose={onCloseTransaction} size="xl">
            {overlayOne}
            <ModalContent>
              <ModalHeader>
                Swap Tokens
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
                  <Text>Swapped Successfully <CheckCircleIcon ml={1} color="green.500" /></Text>
                </Center>

                <Text mt={6}></Text>
                <Text>
                  From:{' '}
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

export default SwapTokens;
