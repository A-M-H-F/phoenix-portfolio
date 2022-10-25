import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import {
    Divider,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    VStack
} from "@chakra-ui/react";

interface ConnectedModalProps {
    overlay: any;
    isOpenNow: boolean;
    onCloseNow: () => void;
    networkName: string;
    chainID: number;
}
const ConnectedModal = ({ overlay, isOpenNow, onCloseNow, networkName, chainID }: ConnectedModalProps) => {
    return (
        <Modal isCentered isOpen={isOpenNow} onClose={onCloseNow}>
            {overlay}
            <ModalContent>
              <ModalHeader>
                <CheckIcon mr={2} />
                Connected
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>

                <Divider orientation='horizontal' />
                <Text mt={5}></Text>

                <VStack>
                  <Text>
                    Connected
                    <CheckCircleIcon ml={2} color="green.500" />
                  </Text>
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
    )
}

export default ConnectedModal;
