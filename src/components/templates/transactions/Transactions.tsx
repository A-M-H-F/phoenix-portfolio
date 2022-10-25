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
import { ITransactions } from './types';
import { useNetwork } from 'wagmi';

const Transactions: FC<ITransactions> = ({ transactions }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const { chain } = useNetwork();
  const [chainUrl, setChainUrl] = React.useState("");
  const [addressUrl, setAddressUrl] = React.useState("");
  const [nativeTokenSymbol, setNativeTokenSymbol] = React.useState("ETH");
  useEffect(() => {
    Chains.filter((chains:any) => {
      if (chains.id === chain?.id) {
        setChainUrl(`${chains.blockExplorers.default.url}/tx/`);
        setAddressUrl(`${chains.blockExplorers.default.url}/address/`);
        setNativeTokenSymbol(chains.nativeCurrency.symbol);
      }
    })
  }, [transactions]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Transactions
      </Heading>
      {transactions?.length ? (
        <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
          <TableContainer w={'full'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Hash</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Amount</Th>
                  <Th>Gas used</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions?.map((tx, key) => (
                  <Tr key={key} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                    <Td>
                      <Link color='teal.500' href={`${chainUrl}${tx?.hash}`} isExternal>
                        {getEllipsisTxt(tx?.hash || '')}
                      </Link>
                    </Td>
                    <Td>
                      <Link color='teal.500' href={`${addressUrl}${tx?.from}`} isExternal>
                        {getEllipsisTxt(tx?.from || '')}
                      </Link>
                    </Td>
                    <Td>
                      <Link color='teal.500' href={`${addressUrl}${tx?.to}`} isExternal>
                      {getEllipsisTxt(tx?.to || '')}
                      </Link>
                    </Td>
                    <Td>{(Number(tx.value) / 1e18).toFixed(4)} {nativeTokenSymbol}</Td>
                    <Td>{tx.gasUsed}</Td>
                    <Td>{new Date(tx.blockTimestamp).toLocaleDateString()}</Td>
                    <Td isNumeric>{tx.receiptStatus}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Hash</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Amount</Th>
                  <Th>Gas used</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Status</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>Looks Like you do not have any transactions</Box>
      )
      }
    </>
  );
};

export default Transactions;
