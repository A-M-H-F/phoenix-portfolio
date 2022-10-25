

interface ChainsProps {
    method: string | any;
    params: [] | any;
  };
export const Avalanche: ChainsProps = {
    method: 'wallet_addEthereumChain',
    params: [
        {
            chainId: '0xa86a',
            chainName: 'Avalanche Network',
            nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://snowtrace.io/'],
        },
    ],
};

export const Bsc: ChainsProps = {
    method: 'wallet_addEthereumChain',
    params: [
        {
            chainId: '0x38',
            chainName: 'Binance Smart Chain Mainnet',
            nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
            rpcUrls: ['https://bsc-dataseed1.binance.org'],
            blockExplorerUrls: ['https://bscscan.com/'],
        },
    ],
};

export const Polygon: ChainsProps = {
    method: 'wallet_addEthereumChain',
    params: [
        {
            chainId: '0x89',
            chainName: 'Polygon Mainnet',
            nativeCurrency: { name: 'Polygon', symbol: 'MATIC', decimals: 18 },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://polygonscan.com/'],
        },
    ],
};

export const Fantom: ChainsProps = {
    method: 'wallet_addEthereumChain',
    params: [
        {
            chainId: '0xfa',
            chainName: 'Fantom Opera',
            nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
            rpcUrls: ['https://fantom-mainnet.public.blastapi.io'],
            blockExplorerUrls: ['https://ftmscan.com/'],
        },
    ],
};

export const BscTestnet: ChainsProps = {
    method: 'wallet_addEthereumChain',
    params: [
        {
            chainId: '0x61',
            chainName: 'Binance Smart Chain Testnet',
            nativeCurrency: { name: 'TBNB', symbol: 'TBNB', decimals: 18 },
            rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545	'],
            blockExplorerUrls: ['https://testnet.bscscan.com/'],
        },
    ],
};

export const Goerli: ChainsProps = {
    method: 'wallet_addEthereumChain',
    params: [
        {
            chainId: '0x5',
            chainName: 'Optimism Goerli Testnet',
            nativeCurrency: { name: 'Optimism Goerli', symbol: 'ETH', decimals: 18 },
            rpcUrls: ['https://goerli.optimism.io/'],
            blockExplorerUrls: ['https://goerli.etherscan.io/'],
        },
    ],
};

export const Mumbai: ChainsProps = {
    method: 'wallet_addEthereumChain',
    params: [
        {
            chainId: '0x13881',
            chainName: 'Polygon Mumbai',
            nativeCurrency: { name: 'Polygon Mumbai', symbol: 'MATIC', decimals: 18 },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        },
    ],
};
