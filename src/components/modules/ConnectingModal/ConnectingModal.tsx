import {
  Divider,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";

interface ConnectingModalProps {
  overlay: any;
  isOpen: boolean;
  onClose: () => void;
  networkName: string;
  chainID: number;
}
const ConnectingModal = ({ overlay, isOpen, onClose, networkName, chainID }: ConnectingModalProps) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      {overlay}
      <ModalContent>
        <ModalHeader>
          <Spinner mr={2} />
          Connecting...
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>

          <Divider orientation='horizontal' />
          <Text mt={5}></Text>

          <VStack>
            <Text>
              Please Sign The Message
              <Spinner ml={2} />
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

export default ConnectingModal;
