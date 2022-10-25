import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  VStack,
  Heading,
  Box,
  Text,
  Avatar,
  HStack,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import Chains from 'components/modules/Chains/Chains';
import React, { FC, useEffect } from 'react';
import { getEllipsisTxt } from 'utils/format';
import { useNetwork } from 'wagmi';
import { IERC20Balances } from './types';

const ERC20Balances: FC<IERC20Balances> = ({ balances }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const { chain } = useNetwork();
  const [tokenUrl, setTokenUrl] = React.useState("");

  useEffect(() => {
    Chains.filter((chains:any) => {
      if (chains.id === chain?.id) {
        setTokenUrl(`${chains.blockExplorers.default.url}/token/`);
      }
    })
  }, [balances]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Token Balances
      </Heading>
      {balances?.length ? (
        <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
          <TableContainer w={'full'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Token</Th>
                  <Th>Value</Th>
                  <Th isNumeric>Address</Th>
                </Tr>
              </Thead>
              <Tbody>
                {balances?.map(({ token, value }, key) => (
                  <Tr key={`${token?.symbol}-${key}-tr`} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                    <Td>
                      <HStack>
                        <Avatar size="sm" src={token?.logo || ''} name={token?.name} />
                        <VStack alignItems={'flex-start'}>
                          <Text as={'span'}>
                            <Link color='teal.500' href={`${tokenUrl}${token?.contractAddress}`} isExternal>
                              {token?.name}
                            </Link>
                          </Text>
                          <Text fontSize={'xs'} as={'span'}>
                            {token?.symbol}
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td>{value}</Td>
                    <Td isNumeric>
                      <Link color='teal.500' href={`${tokenUrl}${token?.contractAddress}`} isExternal>
                        {getEllipsisTxt(token?.contractAddress || '')}
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Token</Th>
                  <Th>Value</Th>
                  <Th isNumeric>Address</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>Looks Like you do not have any ERC20 tokens</Box>
      )}
    </>
  );
};

export default ERC20Balances;
