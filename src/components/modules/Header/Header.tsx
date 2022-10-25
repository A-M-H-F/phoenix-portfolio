import { Box, Container, Flex, HStack } from '@chakra-ui/react';
import { ColorModeButton, PhoenixLogo } from 'components/elements';
import { ConnectWallet } from '../ConnectWallet';

const Header = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Container maxW="container.xl" p={'10px'}>
        <Flex align="center" justify="space-between">
          <PhoenixLogo />
          <HStack gap={'10px'}>
            <ConnectWallet />
            <ColorModeButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
