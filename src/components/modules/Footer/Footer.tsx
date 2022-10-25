import { Box, Divider, Link, Text, useColorModeValue } from '@chakra-ui/react';

const links = {
  get: 'https://grow.phoenix-lb.net/get-a-quote',
  website: 'https://grow.phoenix-lb.net',
  contact: 'https://grow.phoenix-lb.net/contact',
  linkedin: 'https://www.linkedin.com/in/amhf/',
  buy: '/buymeacoffee'
};

const Footer = () => {
  return (
    <Box textAlign={'center'} w="full" p={6} bg={useColorModeValue('gray.100', 'gray.900')}>
      <Divider />
      <Text mb={5}></Text>
      <Text>
        You have a question? {' '}
        <Link href={links.contact} isExternal alignItems={'center'} color='teal.500'>
          Contact Us
        </Link>
      </Text>
      <Text>
        <Link href={links.buy} alignItems={'center'} ml={1} color='teal.500'>
          Buy Me A Coffee
        </Link>
      </Text>
      <Text mb={5}></Text>
      <Divider />
      <Text mb={5}></Text>
      <Text>
      Developed with ❤️ by
        <Link href={links.linkedin} isExternal alignItems={'center'} ml={1} color='teal.500'>
          Hussein Istanbouli
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
