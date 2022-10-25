const Chains: any = [
    {
        "id": 1,
        "name": "Ethereum",
        "logoName": "ethereum",
        "network": "homestead",
        "logo": "/eth.png",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18
        },
        "rpcUrls": {
            "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
            "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
            "infura": "https://mainnet.infura.io/v3",
            "public": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC"
        },
        "blockExplorers": {
            "etherscan": {
                "name": "Etherscan",
                "url": "https://etherscan.io"
            },
            "default": {
                "name": "Etherscan",
                "url": "https://etherscan.io"
            }
        },
        "ens": {
            "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
        },
        "multicall": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 14353601
        }
    },
    {
        "id": 5,
        "name": "Goerli",
        "logoName": "Goerli",
        "network": "goerli",
        "logo": "/eth.png",
        "nativeCurrency": {
            "name": "Goerli Ether",
            "symbol": "ETH",
            "decimals": 18
        },
        "rpcUrls": {
            "alchemy": "https://eth-goerli.alchemyapi.io/v2",
            "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
            "infura": "https://goerli.infura.io/v3",
            "public": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC"
        },
        "blockExplorers": {
            "etherscan": {
                "name": "Etherscan",
                "url": "https://goerli.etherscan.io"
            },
            "default": {
                "name": "Etherscan",
                "url": "https://goerli.etherscan.io"
            }
        },
        "ens": {
            "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
        },
        "multicall": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 6507670
        },
        "testnet": true
    },
    {
        "id": 56,
        "name": "Binance Smart Chain",
        "logoName": "binance",
        "logo": "/bsc.png",
        "rpcUrls": {
            "default": "https://bsc-dataseed.binance.org/"
        },
        "nativeCurrency": {
            "name": "Binance Coin",
            "symbol": "BNB",
            "decimals": 18
        },
        "blockExplorers": {
            "bscscan": {
                "name": "Bscscan",
                "url": "https://bscscan.com"
            },
            "default": {
                "name": "Bscscan",
                "url": "https://bscscan.com"
            }
        },
    },
    {
        "id": 97,
        "name": "Binance Smart Chain Testnet",
        "logoName": "binance",
        "logo": "/bsc.png",
        "rpcUrls": {
            "default": "https://data-seed-prebsc-1-s1.binance.org:8545/"
        },
        "testnet": true,
        "nativeCurrency": {
            "name": "Binance Coin Testnet",
            "symbol": "TBNB",
            "decimals": 18
        },
        "blockExplorers": {
            "bscscan": {
                "name": "testnet.bscscan",
                "url": "https://bscscan.com"
            },
            "default": {
                "name": "testnet.bscscan",
                "url": "https://testnet.bscscan.com"
            }
        },
    },
    {
        "id": 0xa86a,
        "name": "Avalanche Network",
        "logoName": "avalanchec",
        "logo": "/avalanche.png",
        "rpcUrls": {
            "default": "https://api.avax.network/ext/bc/C/rpc"
        },
        "nativeCurrency": {
            "name": "Avalanche",
            "symbol": "AVAX",
            "decimals": 18
        },
        "blockExplorers": {
            "snowtrace": {
                "name": "snowtrace",
                "url": "https://snowtrace.io"
            },
            "default": {
                "name": "snowtrace",
                "url": "https://snowtrace.io"
            }
        },
    },
    {
        "id": 0x89,
        "name": "Polygon Mainnet",
        "logoName": "polygon",
        "logo": "/polygon.png",
        "rpcUrls": {
            "default": "https://polygon-rpc.com"
        },
        "nativeCurrency": {
            "name": "Matic",
            "symbol": "MATIC",
            "decimals": 18
        },
        "blockExplorers": {
            "polygonscan": {
                "name": "polygonscan",
                "url": "https://polygonscan.com"
            },
            "default": {
                "name": "polygonscan",
                "url": "https://polygonscan.com"
            }
        },
    },
    {
        "id": 0x13881,
        "name": "Polygon Mumbai",
        "logoName": "polygon",
        "logo": "/polygon.png",
        "rpcUrls": {
            "default": "https://rpc-mumbai.maticvigil.com/"
        },
        "nativeCurrency": {
            "name": "Matic",
            "symbol": "MATIC",
            "decimals": 18
        },
        "blockExplorers": {
            "polygonscan": {
                "name": "polygonscan",
                "url": "https://mumbai.polygonscan.com/"
            },
            "default": {
                "name": "polygonscan",
                "url": "https://mumbai.polygonscan.com/"
            }
        },
    },
    {
        "id": 0xfa,
        "name": "Fantom Opera",
        "logoName": "fantom",
        "logo": "/fantom.png",
        "rpcUrls": {
            "default": "https://fantom-mainnet.public.blastapi.io"
        },
        "nativeCurrency": {
            "name": "Fantom",
            "symbol": "FTM",
            "decimals": 18
        },
        "blockExplorers": {
            "ftmscan": {
                "name": "ftmscan",
                "url": "https://ftmscan.com"
            },
            "default": {
                "name": "ftmscan",
                "url": "https://ftmscan.com"
            }
        },
    },
];

export default Chains;