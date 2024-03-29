import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button size="md" onClick={toggleColorMode} ml={2} variant='outline'>
        {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
      </Button>
      </>
  );
};

export default ColorModeButton;
