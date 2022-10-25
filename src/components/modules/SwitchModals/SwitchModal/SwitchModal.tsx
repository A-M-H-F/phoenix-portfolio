import { CheckIcon, InfoIcon, TimeIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
    Button,
    Divider,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useSwitchNetwork, useNetwork, useAccount } from 'wagmi';


interface SwitchModalProps {
    isOpenSwitch: boolean;
    onCloseSwitch: () => void;
    overlayTwo: any;
    setSwitching(e: boolean): any;
    setSwitchingTrue(e: boolean): any;
    setChainID(e: number): any;
    setNetworkName(e: string): any;
    setSignNetwork(e: boolean): any;
}

const SwitchModal = ({
    isOpenSwitch,
    onCloseSwitch,
    overlayTwo,
    setSwitching,
    setSwitchingTrue,
    setChainID,
    setNetworkName,
    setSignNetwork,
}: SwitchModalProps) => {
    const toast = useToast();
    const { chain } = useNetwork();
    const { connector } = useAccount();

    const { error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
        onSuccess() {
            setSwitching(false);
            setSwitchingTrue(true);
        },
        onError(error) {
            setSwitching(false);
            setSwitchingTrue(false);
            console.log('Error', error)
        },
    });

    const switchNetworkNow = async (network: any, name: any) => {
        try {
            setChainID(network);
            setNetworkName(name);
            setSwitching(true);
            setSignNetwork(true);
            switchNetwork?.(network);
        } catch (e) {
            toast({
                title: 'Oops, something is wrong...',
                description: (e as { message: string })?.message,
                status: 'error',
                position: 'top-right',
                isClosable: true,
            });
        }
    }

    return (
        <>
            {connector && connector.name === 'Coinbase Wallet'
                ?
                <Modal isCentered isOpen={isOpenSwitch} onClose={onCloseSwitch}>
                    {overlayTwo}
                    <ModalContent>
                        <ModalHeader>
                            <Text><WarningTwoIcon color='red.500' /> Disabled</Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>

                            <Divider orientation='horizontal' />
                            <Text mt={5}></Text>

                            <VStack>
                                <Text>Disabled Using 'Coinbase Wallet'</Text>

                                <Text mt={5}></Text>
                                <Text>Use MetaMask / WalletConnect to access Switch Feature</Text>

                                <Text mt={5}></Text>

                                <Text>Coming Soon <TimeIcon color='green.500' /></Text>
                            </VStack>

                            <Text mt={5}></Text>
                            <Divider orientation='horizontal' />

                        </ModalBody>
                        <ModalFooter>
                            <Text>Phoenix Grow Team</Text>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                :
                <Modal isCentered isOpen={isOpenSwitch} onClose={onCloseSwitch}>
                    {overlayTwo}
                    <ModalContent>
                        <ModalHeader>Switch Network</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <VStack>
                                <Divider orientation='horizontal' />
                                <Text>Choose Network </Text>

                                <Text>Mainnet</Text>
                                <Button
                                    variant={chain?.id === 0x1 ? 'solid' : 'outline'}
                                    disabled={!switchNetwork || 0x1 === chain?.id}
                                    key={0x1}
                                    onClick={() => switchNetworkNow(0x1, 'Ethereum')}
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
                                        <Text>
                                            Ethereum
                                            {isLoading && pendingChainId === 0x1 && ' (switching)'}
                                        </Text>
                                        {chain?.id === 0x1 ? <CheckIcon /> : null}
                                    </HStack>
                                </Button>

                                <Button
                                    variant={chain?.id === 0x38 ? 'solid' : 'outline'}
                                    disabled={!switchNetwork || 0x38 === chain?.id}
                                    key={0x38}
                                    onClick={() => switchNetworkNow(0x38, 'Binance Smart Chain')}
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
                                        <Text>
                                            Binance Smart Chain
                                            {isLoading && pendingChainId === 0x38 && ' (switching)'}
                                        </Text>
                                        {chain?.id === 0x38 ? <CheckIcon /> : null}
                                    </HStack>
                                </Button>

                                <Button
                                    variant={chain?.id === 0x89 ? 'solid' : 'outline'}
                                    disabled={!switchNetwork || 0x89 === chain?.id}
                                    key={0x89}
                                    onClick={() => switchNetworkNow(0x89, 'Polygon')}
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
                                        <Text>
                                            Polygon
                                            {isLoading && pendingChainId === 0x89 && ' (switching)'}
                                        </Text>
                                        {chain?.id === 0x89 ? <CheckIcon /> : null}
                                    </HStack>
                                </Button>

                                <Button
                                    variant={chain?.id === 0xa86a ? 'solid' : 'outline'}
                                    disabled={!switchNetwork || 0xa86a === chain?.id}
                                    key={0xa86a}
                                    onClick={() => switchNetworkNow(0xa86a, 'Avalanche')}
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
                                        <Text>
                                            Avalanche
                                            {isLoading && pendingChainId === 0xa86a && ' (switching)'}
                                        </Text>
                                        {chain?.id === 0xa86a ? <CheckIcon /> : null}
                                    </HStack>
                                </Button>

                                <Button
                                    variant={chain?.id === 0xfa ? 'solid' : 'outline'}
                                    disabled={!switchNetwork || 0xfa === chain?.id}
                                    key={0xfa}
                                    onClick={() => switchNetworkNow(0xfa, 'Fantom')}
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
                                        <Text>
                                            Fantom
                                            {isLoading && pendingChainId === 0xfa && ' (switching)'}
                                        </Text>
                                        {chain?.id === 0xfa ? <CheckIcon /> : null}
                                    </HStack>
                                </Button>

                                <Text>Testnet</Text>
                                <Button
                                    variant={chain?.id === 0x61 ? 'solid' : 'outline'}
                                    disabled={!switchNetwork || 0x61 === chain?.id}
                                    key={0x61}
                                    onClick={() => switchNetworkNow(0x61, 'Binance Smart Chain Testnet')}
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
                                        <Text>
                                            Binance Smart Chain Testnet
                                            {isLoading && pendingChainId === 0x61 && ' (switching)'}
                                        </Text>
                                        {chain?.id === 0x61 ? <CheckIcon /> : null}
                                    </HStack>
                                </Button>

                                <Button
                                    variant={chain?.id === 0x5 ? 'solid' : 'outline'}
                                    disabled={!switchNetwork || 0x5 === chain?.id}
                                    key={0x5}
                                    onClick={() => switchNetworkNow(0x5, 'Goerli Testnet')}
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
                                        <Text>
                                            Optimism Goerli Testnet
                                            {isLoading && pendingChainId === 0x5 && ' (switching)'}
                                        </Text>
                                        {chain?.id === 0x5 ? <CheckIcon /> : null}
                                    </HStack>
                                </Button>

                                <Button
                                    variant={chain?.id === 0x13881 ? 'solid' : 'outline'}
                                    disabled={!switchNetwork || 0x13881 === chain?.id}
                                    key={0x13881}
                                    onClick={() => switchNetworkNow(0x13881, 'Polygon Mumbai')}
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
                                            alt="Polygon Mumbai Logo"
                                            width={25}
                                            height={25}
                                            borderRadius="3px"
                                        />
                                        <Text>
                                            Polygon Mumbai
                                            {isLoading && pendingChainId === 0x13881 && ' (switching)'}
                                        </Text>
                                        {chain?.id === 0x13881 ? <CheckIcon /> : null}
                                    </HStack>
                                </Button>

                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onCloseSwitch}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>}
        </>
    );
}

export default SwitchModal;