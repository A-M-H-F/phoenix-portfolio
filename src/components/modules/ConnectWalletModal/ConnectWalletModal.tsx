import { CheckIcon } from "@chakra-ui/icons";
import {
    Button,
    Divider,
    HStack,
    Image,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    VStack
} from "@chakra-ui/react";
import { useConnect } from 'wagmi';

interface ConnectWalletModalProps {
    overlay: any;
    isOpen: boolean;
    onClose: () => void;
    setChainID(e : number): any;
    handleAuth(e : string): any;
    chainID: number
}
const ConnectWalletModal = ({ overlay, isOpen, onClose, setChainID, handleAuth, chainID }: ConnectWalletModalProps) => {
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
                <ModalHeader>Connect Your Wallet</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <VStack>
                        <Divider orientation='horizontal' />
                        <Text>Choose Network</Text>
                        <Text>Mainnet</Text>
                        <Button
                            variant={chainID === 0x1 ? 'solid' : 'outline'}
                            onClick={() => setChainID(0x1)}
                            w="100%"
                            m={50}
                            _focus={{
                                boxShadow:
                                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',

                            }}
                            _active={{
                                bg: '#dddfe2',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/eth.png"
                                    alt="Ethereum Logo"
                                    width={25}
                                    height={25}
                                    borderRadius="3px"
                                />
                                <Text>Ethereum</Text>
                                {chainID === 0x1 ? <CheckIcon /> : null}
                            </HStack>
                        </Button>

                        <Button
                            variant={chainID === 0x38 ? 'solid' : 'outline'}
                            onClick={() => setChainID(0x38)}
                            w="100%"
                            m={50}
                            _focus={{
                                boxShadow:
                                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }}
                            _active={{
                                bg: '#dddfe2',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/bsc.png"
                                    alt="Binance Smart Chain Logo"
                                    width={25}
                                    height={25}
                                    borderRadius="3px"
                                />
                                <Text>Binance Smart Chain</Text>
                                {chainID === 0x38 ? <CheckIcon /> : null}
                            </HStack>
                        </Button>

                        <Button
                            variant={chainID === 0x89 ? 'solid' : 'outline'}
                            onClick={() => setChainID(0x89)}
                            w="100%"
                            m={50}
                            _focus={{
                                boxShadow:
                                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }}
                            _active={{
                                bg: '#dddfe2',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/polygon.png"
                                    alt="Polygon Logo"
                                    width={25}
                                    height={25}
                                    borderRadius="3px"
                                />
                                <Text>Polygon</Text>
                                {chainID === 0x89 ? <CheckIcon /> : null}
                            </HStack>
                        </Button>

                        <Button
                            variant={chainID === 0xa86a ? 'solid' : 'outline'}
                            onClick={() => setChainID(0xa86a)}
                            w="100%"
                            m={50}
                            _focus={{
                                boxShadow:
                                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }}
                            _active={{
                                bg: '#dddfe2',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/avalanche.png"
                                    alt="Avalanche Logo"
                                    width={25}
                                    height={25}
                                    borderRadius="3px"
                                />
                                <Text>Avalanche</Text>
                                {chainID === 0xa86a ? <CheckIcon /> : null}
                            </HStack>
                        </Button>

                        <Button
                            variant={chainID === 0xfa ? 'solid' : 'outline'}
                            onClick={() => setChainID(0xfa)}
                            w="100%"
                            m={50}
                            _focus={{
                                boxShadow:
                                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }}
                            _active={{
                                bg: '#dddfe2',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/fantom.png"
                                    alt="Fantom Logo"
                                    width={25}
                                    height={25}
                                    borderRadius="3px"
                                />
                                <Text>Fantom</Text>
                                {chainID === 0xfa ? <CheckIcon /> : null}
                            </HStack>
                        </Button>



                        <Text>Testnet</Text>
                        <Button
                            variant={chainID === 0x61 ? 'solid' : 'outline'}
                            onClick={() => setChainID(0x61)}
                            w="100%"
                            m={50}
                            _focus={{
                                boxShadow:
                                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }}
                            _active={{
                                bg: '#dddfe2',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/bsc.png"
                                    alt="Binance Smart Chain Testnet"
                                    width={25}
                                    height={25}
                                    borderRadius="3px"
                                />
                                <Text>Binance Smart Chain Testnet</Text>
                                {chainID === 0x61 ? <CheckIcon /> : null}
                            </HStack>
                        </Button>

                        <Button
                            variant={chainID === 0x5 ? 'solid' : 'outline'}
                            onClick={() => setChainID(0x5)}
                            w="100%"
                            m={50}
                            _focus={{
                                boxShadow:
                                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }}
                            _active={{
                                bg: '#dddfe2',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/eth.png"
                                    alt="Goerli Testnet Logo"
                                    width={25}
                                    height={25}
                                    borderRadius="3px"
                                />
                                <Text>Optimism Goerli Testnet</Text>
                                {chainID === 0x5 ? <CheckIcon /> : null}
                            </HStack>
                        </Button>

                        <Button
                            variant={chainID === 0x13881 ? 'solid' : 'outline'}
                            onClick={() => setChainID(0x13881)}
                            w="100%"
                            m={50}
                            _focus={{
                                boxShadow:
                                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }}
                            _active={{
                                bg: '#dddfe2',
                                transform: 'scale(0.98)',
                                borderColor: '#bec3c9',
                            }}
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/polygon.png"
                                    alt="Polygon Mumbai"
                                    width={25}
                                    height={25}
                                    borderRadius="3px"
                                />
                                <Text>Polygon Mumbai</Text>
                                {chainID === 0x13881 ? <CheckIcon /> : null}
                            </HStack>
                        </Button>
                    </VStack>

                    <Text mt={10}></Text>
                    <Divider orientation='horizontal' />
                    <Text mb={5}></Text>

                    <VStack>
                        <Text>Choose Wallet</Text>

                        <Button
                            variant="outline"
                            onClick={() => handleAuth("MetaMask")}
                            w="100%"
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/meta.png"
                                    alt="Metamask Logo"
                                    width={25}
                                    height={25}
                                    borderRadius="3px"
                                />
                                <Text>Metamask</Text>
                            </HStack>
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => handleAuth("WalletConnect")}
                            w="100%"
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/wallet.png"
                                    alt="Wallet Connect Logo"
                                    width={26}
                                    height={26}
                                    borderRadius="3px"
                                />
                                <Text>Wallet Connect</Text>
                            </HStack>
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => handleAuth("Coinbase Wallet")}
                            w="100%"
                        >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                    src="/coin.png"
                                    alt="Coinbase Wallet Logo"
                                    width={25}
                                    height={25}
                                    borderRadius="3px"
                                />
                                <Text>Coinbase Wallet</Text>
                            </HStack>
                        </Button>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConnectWalletModal;
