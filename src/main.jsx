import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.js'

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <StrictMode>
    <App />
  </StrictMode>
  </ChakraProvider>
)
