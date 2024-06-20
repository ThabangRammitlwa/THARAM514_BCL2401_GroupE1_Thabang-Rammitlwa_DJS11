
import ReactDOM from 'react-dom/client';
import App from './App';
import { ColorModeScript ,ChakraProvider, theme } from '@chakra-ui/react'
import { StrictMode } from 'react';
import ColorModeSwitcher from './ColorModeSwitcher.jsx'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher/>
    <App />
    </ChakraProvider>
  </StrictMode>
);


export const server = `https://podcast-api.netlify.app/`;