import { ChakraProvider } from '@chakra-ui/react';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { extendTheme } from '@chakra-ui/react';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { infuraProvider } from 'wagmi/providers/infura';
import { MoralisProvider } from 'react-moralis';
import Chains from 'components/modules/Chains/Chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Toaster } from 'react-hot-toast';

const { chains, provider, webSocketProvider } = configureChains(Chains, [publicProvider(), infuraProvider({ apiKey: process.env.INFURA_ID })]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Phoenix Grow Web3 Portfolio',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
});

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_APP_ID;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <MoralisProvider appId={appId ?? ''} serverUrl={serverUrl ?? ''}>
            <Component {...pageProps} />
            <Toaster/>
          </MoralisProvider>
        </SessionProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;
