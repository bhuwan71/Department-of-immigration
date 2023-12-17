import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import ContextProvider from '@contexts/index'
import EncryptDecrypt from '@functions/EncryptDecrypt'
import App from '../App'
import { type AdminLoginSchema } from '@graphql/schema/graphql'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL as string,
})

const authLink = setContext(async (_, { headers }) => {
  const { decrypt } = EncryptDecrypt
  const user = localStorage.getItem('epbs__user') ?? '{}'
  const initialUser: string = user ? (JSON.parse(user) as string) : ''
  const decryptAdminDetails = decrypt(initialUser) as string
  const adminDetails = JSON.parse(decryptAdminDetails || '{}') as AdminLoginSchema
  const accessToken = adminDetails?.accessToken ?? ''
  // If access token doesn't exist, return headers as is
  if (!accessToken) {
    return { headers }
  }

  // If access token exists but is expired, use refresh token to get new access token
  const { exp: tokenExpiration } = JSON.parse(atob(accessToken?.split('.')[1] || '{}')) || {}
  const tokenExpired = Date.now() > tokenExpiration * 1000
  if (tokenExpired) {
    // If access token is expired, fetch a new access token using the refresh token
  }

  // If access token exists and is not expired, return headers with access token
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
const GraphQl = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </ApolloProvider>
    </div>
  )
}

export default GraphQl
