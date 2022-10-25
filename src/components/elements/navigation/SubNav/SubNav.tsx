import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { useColorModeValue, Stack, Flex, Box, Text, Link } from '@chakra-ui/react';
import { useNetwork } from 'wagmi';
import { Illustration } from '@web3uikit/core';
import { Logo } from '@web3uikit/core/dist/lib/Illustrations/types';
import Chains from 'components/modules/Chains/Chains';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import Image from 'next/image';

export interface ISubNav {
  label: string;
  subLabel?: string;
  logo?: Logo;
  href?: string;
  children?: Array<ISubNav>;
  icon: IconType;
}

const SubNav = ({ label, href, subLabel, logo }: ISubNav) => {
  const [chainLogo, setChainLogo] = useState('/eth.png');
  const [lableName, setLabelName] = useState('ETH');
  const { chain } = useNetwork();
  useEffect(() => {
    Chains.map((chains:any) => {
      if (chains.id === chain?.id) {
        setChainLogo(chains.logo);
        setLabelName(chains.nativeCurrency.symbol)
      }
    })
  }, [chainLogo, chain])
  return (
    <NextLink href={href || '#'}>
      <Link
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
      >
        <Stack direction={'row'} align={'center'}>
          {logo === undefined ?
            <Image
            src={chainLogo}
            width={25}
            height={25}
            alt="logo"
          />
            :
            <Illustration logo={logo as Logo} width={46} height={46} id={`${label}-navitem`} />}
          <Box>
            {label === "Send" ? 
            <Text>{label} {lableName}</Text> : 
            <Text transition={'all .3s ease'} _groupHover={{ color: 'green.400' }} fontWeight={500}>
              {label}
            </Text>}
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}
          >
            <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  );
};

export default SubNav;
