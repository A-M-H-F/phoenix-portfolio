import * as React from 'react'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Box,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import Chains from 'components/modules/Chains/Chains';
import { FC, useEffect } from 'react';
import { getEllipsisTxt } from 'utils/format';
import { IERC20Transfers } from './types';
import { useNetwork } from 'wagmi';

const ERC20Transfers: FC<IERC20Transfers> = ({ transfers }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const { chain } = useNetwork();
  const [chainUrl, setChainUrl] = React.useState("");
  const [addressUrl, setAddressUrl] = React.useState("");
  const [tokenUrl, setTokenUrl] = React.useState("");

  useEffect(() => {
    Chains.filter((chains:any) => {
      if (chains.id === chain?.id) {
        setChainUrl(`${chains.blockExplorers.default.url}/tx/`);
        setAddressUrl(`${chains.blockExplorers.default.url}/address/`);
        setTokenUrl(`${chains.blockExplorers.default.url}/token/`);
      }
    })
  }, [transfers]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Token Transfers
      </Heading>
      {transfers?.length ? (
        <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
          <TableContainer w={'full'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Hash</Th>
                  <Th>Token</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transfers?.map((transfer, key) => (
                  <Tr key={key} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                    <Td>
                      <Link color='teal.500' href={`${chainUrl}${transfer?.transactionHash}`} isExternal>
                        {getEllipsisTxt(transfer?.transactionHash || '')}
                      </Link>
                    </Td>
                    <Td>
                      <Link color='teal.500' href={`${tokenUrl}${transfer?.address}`} isExternal>
                        {getEllipsisTxt(transfer?.address || '')}
                      </Link>
                    </Td>
                    <Td>
                      <Link color='teal.500' href={`${addressUrl}${transfer?.fromAddress}`} isExternal>
                        {getEllipsisTxt(transfer?.fromAddress || '')}
                      </Link>
                    </Td>
                    <Td>
                      <Link color='teal.500' href={`${addressUrl}${transfer?.toAddress}`} isExternal>
                        {getEllipsisTxt(transfer?.toAddress || '')}
                      </Link>
                    </Td>
                    <Td>{new Date(transfer.blockTimestamp).toLocaleDateString()}</Td>
                    <Td isNumeric>{(Number(transfer.value) / 1e18).toFixed(3)}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Hash</Th>
                  <Th>Token</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Value</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>Looks Like you do not have any ERC20 Transfers</Box>
      )}
    </>
  );
};

export default ERC20Transfers;
