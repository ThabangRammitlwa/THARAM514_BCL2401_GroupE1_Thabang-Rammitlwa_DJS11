
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

 const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      variant="ghost"
      color="current"
      position={'fixed'}
      top={4}
      right={4}
      onClick={toggleColorMode}
      zIndex={'overlay'}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};


export default ColorModeSwitcher