import { ArrowBackIcon, CopyIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Button,
    Divider,
    Flex, HStack,
    Input, Link,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useClipboard
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "utils/format";
import { useDisconnect, useAccount, useNetwork } from "wagmi";

interface ProfileModal {
    chainName: string;
    nativeTokenSymbol: string;
    addressUrl: string;
    nativeBalance: number;
    isOpenProfile: boolean;
    onCloseProfile: () => void;
    onOpenProfile: () => void;
    usdPrice: string;
}
const ProfileModal = ({ usdPrice, chainName, nativeTokenSymbol, addressUrl, nativeBalance, isOpenProfile, onCloseProfile, onOpenProfile }: ProfileModal) => {
    const { disconnectAsync } = useDisconnect();
    const { logout } = useMoralis();
    const { address, connector } = useAccount();
    const { chain } = useNetwork();

    const handleDisconnect = async () => {
        await disconnectAsync();
        await logout();
        signOut({ callbackUrl: '/' });
    };

    const OverlayProfile = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    );

    const [overlayProfile, setOverlayProfile] = React.useState(<OverlayProfile />);
    const [copyAddress] = React.useState(getEllipsisTxt(String(address)));
    const { hasCopied, onCopy } = useClipboard(String(address));

    return (
        <>
            <Button onClick={() => {
                setOverlayProfile(<OverlayProfile />)
                onOpenProfile()
            }} cursor={'pointer'} variant='outline'>
                <Text fontWeight="medium">{getEllipsisTxt(String(address))}</Text>
            </Button>

            <Modal isCentered isOpen={isOpenProfile} onClose={onCloseProfile}>
                {overlayProfile}
                <ModalContent>
                    <ModalHeader>
                        <Avatar size="sm" mr={2} />
                        Profile ${usdPrice}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Divider orientation='horizontal' />
                        <Text mt={2}></Text>
                        <Flex >
                            <Input variant='unstyled' value={copyAddress} size='xl' isReadOnly width='auto' color='green.500' />
                            <Button onClick={onCopy} mr={1} size='sm' backgroundColor='blue.500'>
                                {hasCopied ? 'Copied' : <CopyIcon cursor={'pointer'} />}
                            </Button>
                            <Button onClick={handleDisconnect} ml={95} size='sm' backgroundColor='red.500'>
                                Disconnect
                            </Button>
                        </Flex>
                        <Text mt={10}></Text>
                        <Text>Balance: {nativeBalance} {nativeTokenSymbol}</Text>
                        <Text>Network Name: {chainName}</Text>
                        <Text>Chain ID: {chain?.id}</Text>
                        {connector ? <Text>Connector: {connector.name}</Text> : null}
                        <Text>
                            View Address On{' '}
                            <Link color='teal.500' href={`${addressUrl}${address}`} isExternal>
                                Block Explorer
                            </Link>
                        </Text>
                        <Text mt={2}></Text>
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

export default ProfileModal;
