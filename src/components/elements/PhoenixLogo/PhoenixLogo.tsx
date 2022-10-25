import { useColorMode } from '@chakra-ui/react';
import Image from 'next/image';

const PhoenixLogo = () => {
  const { colorMode } = useColorMode();

  return (
    <Image
      src={colorMode === 'dark' ? '/light.png' : '/dark.png'}
      height={45}
      width={200}
      alt="Phoenix Grow LB"
    />
  );
};

export default PhoenixLogo;
