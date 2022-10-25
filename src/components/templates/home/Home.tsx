import { CheckCircleIcon, SettingsIcon } from '@chakra-ui/icons';
import { Heading, VStack, List, ListIcon, ListItem, Divider, Text, Center, Progress } from '@chakra-ui/react';

const Home = () => {
  return (
    <VStack w={'full'}>
      <Heading size="md" marginBottom={6}>
        <Center>
          <Text>Phoenix Grow Web3 Portfolio (Beta)</Text>
        </Center>
        <Center>
          <Text color="blue.500">v1.0.0 Features</Text>
        </Center>
        <Progress size="xs" isIndeterminate colorScheme="red" mb={5} />
      </Heading>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Moralis Authentication
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Next.js Session
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Wagmi.sh Integeration
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Multi-Chain Support
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Switch Network Support
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Multi-Wallet Support
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Explorers Full Support
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />5 Mainnet & 3 Testnet Chains Support
        </ListItem>

        <Progress size="xs" isIndeterminate colorScheme="teal" mb={5} />

        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Transfer Native Tokens
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Transfer Tokens (ERC20/BEP20)
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Swap Native To Erc20/Bep20
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Lottery (30 mins - 1 Day - 1 Week - 1 Month) ! Polygon Mumbai !
        </ListItem>
        <ListItem>
          <ListIcon as={SettingsIcon} color="green.500" />
          Transfer ERC721 Tokens (Non-Fungible)
        </ListItem>
        <ListItem>
          <ListIcon as={SettingsIcon} color="green.500" />
          Transfer ERC1155 Tokens (Semi-Fungible)
        </ListItem>
        <ListItem>
          <ListIcon as={SettingsIcon} color="green.500" />
          Swap Tokens (Erc20/Bep20)
        </ListItem>
        <ListItem>
          <ListIcon as={SettingsIcon} color="green.500" />
          Escrow Feature
        </ListItem>

        <Progress size="xs" isIndeterminate colorScheme="red" mb={5} />

        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Display Transactions
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Display Tokens Transfers
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Display Tokens Balances
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Display NFT Balances
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Display NFT Transfers
        </ListItem>

        <Progress size="xs" isIndeterminate colorScheme="teal" mb={5} />

        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Dark - Light Mode
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="blue.500" />
          Buy Me A Coffee
        </ListItem>
        <ListItem>
          <ListIcon as={SettingsIcon} color="green.500" />
          ... more coming soon
        </ListItem>
      </List>
    </VStack>
  );
};

export default Home;
