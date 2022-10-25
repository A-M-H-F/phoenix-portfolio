import { CheckIcon } from "@chakra-ui/icons";
import {
    Button,
    Center,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
} from "@chakra-ui/react";
import React from "react";

interface SwitchSignModalProps {
    networkName: string;
    isOpenSwitch: boolean;
    onCloseSwitch: () => void;
    chainID: number;
    overlayTwo: any;
    handleAuth(e : string): any;
}
import { useAccount } from 'wagmi';

const SwitchSignModal = ({ isOpenSwitch, networkName, onCloseSwitch, chainID, overlayTwo, handleAuth }: SwitchSignModalProps) => {
    const { connector } = useAccount();

    return (
        <Modal isCentered isOpen={isOpenSwitch} onClose={onCloseSwitch} closeOnOverlayClick={false}>
            {overlayTwo}
            <ModalContent>
                <ModalHeader>
                    <CheckIcon mr={2} />
                    Switching
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                    <Divider orientation='horizontal' />
                    <Text mt={5}></Text>
                    <Center>
                        <Text>Please Sign To Continue</Text>
                    </Center>
                    <Text mt={5}></Text>
                    <Center>
                        <Button
                            ml='4'
                            onClick={() => connector != undefined && handleAuth(connector?.name)}
                        >
                            Sign Your Wallet
                        </Button>
                    </Center>

                    <Text mt={10}></Text>
                    <Text>Network Name: {networkName}</Text>
                    <Text>Chain ID: {chainID}</Text>

                    <Text mt={5}></Text>
                    <Divider orientation='horizontal' />

                </ModalBody>
                <ModalFooter>
                    <Text>Phoenix Grow Team</Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SwitchSignModal;