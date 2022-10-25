// import { InjectedConnector } from 'wagmi/connectors/injected';
import { signIn, useSession } from 'next-auth/react';
import { useAccount, useConnect, useDisconnect, useSignMessage, useNetwork, } from 'wagmi';
import apiPost from 'utils/apiPost';
import {
  Button,
  useToast,
  ModalOverlay,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Avalanche, Bsc, Polygon, Fantom, BscTestnet, Goerli, Mumbai } from '../AddNetwork/AddNetwork';
import Chains from '../Chains/Chains';
import { ProfileModal } from '../ProfileModal';
import { SwitchingModal } from '../SwitchModals/SwitchingModal';
import { SwitchSignModal } from '../SwitchModals/SwitchSignModal';
import { SwitchModal } from '../SwitchModals/SwitchModal';
import { ConnectWalletModal } from '../ConnectWalletModal';
import { ConnectedModal } from '../ConnectedModal';
import { ConnectingModal } from '../ConnectingModal';

const ConnectWallet = () => {
  const { connectAsync, connectors } = useConnect();

  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const toast = useToast();
  const { data } = useSession();

  const [switchingTrue, setSwitchingTrue] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [signInNetwork, setSignNetwork] = useState(false);

  const { chain } = useNetwork();

  const [chainID, setChainID] = useState(0x1);
  const [networkName, setNetworkName] = useState("Ethereum");
  const [connecting, setConnecting] = useState(false);
  const [connectedNow, setConnectedNow] = useState(false);


  const [chainName, setChainName] = React.useState("Ethereum");
  const [nativeTokenSymbol, setNativeTokenSymbol] = React.useState("ETH");
  const [addressUrl, setAddressUrl] = React.useState("");
  const [nativeBalance, setNativeBalance] = React.useState<any>();
  const [usdPrice, setUsdPrice] = React.useState<any>();

  const networkC = () => {
    Chains.filter((chains:any) => {
      if (chains.id === chainID) {
        setNetworkName(chains.name);
      }
    });
  }

  // connect
  const OverlayOne = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  )
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  // switch
  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  )
  const { isOpen: isOpenSwitch, onOpen: onOpenSwitch, onClose: onCloseSwitch } = useDisclosure();
  const [overlayTwo, setOverlayTwo] = React.useState(<OverlayTwo />);

  // connected
  const { isOpen: isOpenNow, onOpen: onOpenNow, onClose: onCloseNow } = useDisclosure();

  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();

  interface User {
    address: any;
    chain: any;
    network: any;
  }
  const handleAuth = async (wallet: any) => {
    if (isConnected) {
      await disconnectAsync();
    }
    try {
      const userData: User = { address, chain, network: 'evm' };

      if (wallet === "MetaMask") {
        const { account, chain } = await connectAsync({
          connector: connectors[0],
          chainId: chainID,
        });
        userData.address = account;
        userData.chain = chain?.id
      };

      if (wallet === "Coinbase Wallet") {
        const { account, chain } = await connectAsync({
          connector: connectors[1],
          chainId: chainID,
        });
        userData.address = account;
        userData.chain = chain.id;
      };

      if (wallet === "WalletConnect") {
        const { account, chain } = await connectAsync({
          // WalletConnectConnector
          connector: connectors[2],
          chainId: chainID,
        });
        userData.address = account;
        userData.chain = chain.id;
      };
      setConnecting(true)
      networkC();

      const { message } = await apiPost('/auth/request-message', userData as any);
      const signature = await signMessageAsync({ message });

      onClose();
      setConnectedNow(true);
      onOpenNow();

      await signIn('credentials', { message, signature, callbackUrl: '/' });
    } catch (e:any) {
      toast({
        title: 'Oops, something is wrong...',
        description: (e as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
      if (e.message === "Chain not configured") {
        if (chainID === 0xa86a) {
          await window.ethereum?.request(Avalanche);
        } if (chainID === 0x38) {
          await window.ethereum?.request(Bsc);
        } if (chainID === 0x89) {
          await window.ethereum?.request(Polygon);
        } if (chainID === 0xfa) {
          await window.ethereum?.request(Fantom);
        } if (chainID === 0x5) {
          await window.ethereum?.request(Goerli);
        } if (chainID === 0x61) {
          await window.ethereum?.request(BscTestnet);
        } if (chainID === 0x13881) {
          await window.ethereum?.request(Mumbai);
        }
      }
      toast({
        title: 'Connect Again',
        description: "Please connect again after you add the network",
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
    setConnecting(false);
    setConnectedNow(false);
  };

  useEffect(() => {
    Chains.filter((chains:any) => {
      if (chains.id === chain?.id) {
        setChainName(chains.name);
        setNativeTokenSymbol(chains.nativeCurrency.symbol);
        setAddressUrl(`${chains.blockExplorers.default.url}/address/`);
      }
    });
    if (data) {
      fetch('/api/getnative')
        .then((res) => res.json())
        .then((data) => {
          setNativeBalance((Number(data.balance) / 1e18).toFixed(3));
          setUsdPrice((Number(data.usd) / 1e18).toFixed(2))
        });
    };
  }, [chainID, Chains, data]);

  if (data?.user) {
    return (
      <>
        <ProfileModal
          chainName={chainName}
          nativeTokenSymbol={nativeTokenSymbol}
          addressUrl={addressUrl}
          nativeBalance={nativeBalance}
          isOpenProfile={isOpenProfile}
          onCloseProfile={onCloseProfile}
          onOpenProfile={onOpenProfile}
          usdPrice={usdPrice} />

        {switchingTrue && signInNetwork ?
          <Button
            ml='4'
            onClick={() => {
              setOverlayTwo(<OverlayTwo />)
              onOpenSwitch()
            }}
          >
            <Spinner mr={2} />
            Sign Your Wallet
          </Button>
          : switching ? <Button
            ml='4'
            onClick={() => {
              setOverlayTwo(<OverlayTwo />)
              onOpenSwitch()
            }}
          >
            <Spinner mr={2} />
            Switching...
          </Button>
            : <Button
              ml='2'
              onClick={() => {
                setOverlayTwo(<OverlayTwo />)
                onOpenSwitch()
              }}
              variant='outline'
            >
              Switch
            </Button>}


        {switchingTrue && signInNetwork ?
          <SwitchSignModal
            isOpenSwitch={isOpenSwitch}
            onCloseSwitch={onCloseSwitch}
            overlayTwo={overlayTwo}
            networkName={networkName}
            chainID={chainID}
            handleAuth={handleAuth}
          />
          : switching ?
            <SwitchingModal
              isOpenSwitch={isOpenSwitch}
              onCloseSwitch={onCloseSwitch}
              overlayTwo={overlayTwo}
              networkName={networkName}
              chainID={chainID} />
            :
            <SwitchModal
              onCloseSwitch={onCloseSwitch}
              overlayTwo={overlayTwo}
              setSwitching={setSwitching}
              setSwitchingTrue={setSwitchingTrue}
              setChainID={setChainID}
              setNetworkName={setNetworkName}
              setSignNetwork={setSignNetwork}
              isOpenSwitch={isOpenSwitch} />
        }
      </>
    );
  }

  return (
    <>
      {connecting ?
        <Button
          ml='4'
          onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen()
          }}
        >
          <Spinner mr={2} />
          Connecting
        </Button>
        :
        <Button
          ml='4'
          onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen()
          }}
        >
          Connect Wallet
        </Button>}
      {!connecting && !connectedNow ?
        <ConnectWalletModal
          overlay={overlay}
          isOpen={isOpen}
          onClose={onClose}
          setChainID={setChainID}
          handleAuth={handleAuth}
          chainID={chainID} />
        : connectedNow ?
          <ConnectedModal
            overlay={overlay}
            isOpenNow={isOpenNow}
            onCloseNow={onCloseNow}
            networkName={networkName}
            chainID={chainID} />
          :
          <ConnectingModal
            overlay={overlay}
            isOpen={isOpen}
            onClose={onClose}
            networkName={networkName}
            chainID={chainID} />
      }
    </>
  );
};

export default ConnectWallet;
