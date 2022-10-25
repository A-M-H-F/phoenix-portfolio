import {
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react";

interface SwitchingModalProps {
    networkName: string;
    isOpenSwitch: boolean;
    onCloseSwitch: () => void;
    chainID: number;
    overlayTwo: any
  }

const SwitchingModal = ({ isOpenSwitch, networkName, onCloseSwitch, chainID, overlayTwo } : SwitchingModalProps) => {
    return (
        <Modal isCentered isOpen={isOpenSwitch} onClose={onCloseSwitch} closeOnOverlayClick={false}>
            {overlayTwo}
            <ModalContent>
                <ModalHeader>
                    <Spinner mr={2} />
                    Switching...
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                    <Divider orientation='horizontal' />
                    <Text mt={5}></Text>

                    <VStack>
                        <Text>Switching <Spinner ml={2} /></Text>
                    </VStack>
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

export default SwitchingModal;