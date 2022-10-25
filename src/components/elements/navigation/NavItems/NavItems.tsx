import { Box, Flex, Link, Popover, PopoverContent, PopoverTrigger, Stack, useColorModeValue } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, Icon } from '@chakra-ui/icons';
import { FC, useState } from 'react';
import { ISubNav } from '../SubNav/SubNav';
import { SubNav } from '../SubNav';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const NavItems: FC<ISubNav> = ({ label, children, href, icon }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.400');
  const linkActiveColor = useColorModeValue('gray.800', 'white');
  const router = useRouter();
  const isCurrentPath = router.asPath === href || (href !== '/' && router.pathname.startsWith(href || ''));
  const [chevron, setChevron] = useState(false);

  return (
    <Popover trigger={'hover'} placement={'bottom-start'}>
      <PopoverTrigger>
        <Box>
          <Box
            fontSize={15}
            fontWeight={500}
            color={isCurrentPath ? linkActiveColor : linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkActiveColor,
            }}
            cursor="pointer"
            role="group"
          >
            {children ? (
              <>
                <Flex
                  align="center"
                  p="4"
                  mx="4"
                  borderRadius="lg"
                  role="group"
                  cursor="pointer"
                  _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                  }}
                  onMouseEnter={() => setChevron(true)}
                  onMouseLeave={() => setChevron(false)}
                  onClick={() => setChevron(true)}>
                  {icon && (
                    <Icon
                      mr="4"
                      fontSize="16"
                      _groupHover={{
                        color: 'white',
                      }}
                      w={6} h={6}
                      as={icon}
                    />
                  )}
                  {label} {chevron ? <ChevronUpIcon ml={4} /> : <ChevronDownIcon ml={4} />}
                </Flex>
              </>
            ) : (
              <NextLink href={href || '/'}>
                <Link
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                      bg: 'cyan.400',
                      color: 'white',
                    }}>
                    {icon && (
                      <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                          color: 'white',
                        }}
                        as={icon}
                        w={6} h={6}
                      />
                    )}
                    {label}
                  </Flex>
                </Link>
              </NextLink>
            )}
          </Box>
        </Box>

      </PopoverTrigger>

      {
        children && (
          <PopoverContent border={0} boxShadow={'xl'} p={4} rounded={'xl'} minW={'sm'}>
            <Stack>
              {children.map((child) => (
                <SubNav key={child.label} {...child} />
              ))}
            </Stack>
          </PopoverContent>
        )
      }
    </Popover >
  );
};

export default NavItems;
