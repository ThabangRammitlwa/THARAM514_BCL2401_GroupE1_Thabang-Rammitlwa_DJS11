import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ColorModeScript ,ChakraProvider, theme } from '@chakra-ui/react'
import ColorModeSwitcher from './ColorModeSwitcher.jsx'


const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher/>
    <App />
    </ChakraProvider>
  </React.StrictMode>
);


export const server = `https://podcast-api.netlify.app/`;