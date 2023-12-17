import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@utils/theme'
import '@assets/scss/main.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import ErrorBoundary from 'Error.Boundary.tsx'
import App from 'App'
import ContextProvider from './contexts'
import "./index.css"

const rootElement = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(rootElement).render(
  <ErrorBoundary>
    <ChakraProvider theme={theme}>
      <Router>
        <ContextProvider>
          <App />
        </ContextProvider>
      </Router>
    </ChakraProvider>
  </ErrorBoundary>
)
