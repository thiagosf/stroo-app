import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
})

const authLink = setContext((_, { headers, ...all }) => {
  const token = localStorage.getItem('stroo_token')
  return {
    headers: {
      ...headers,
      usernameization: token ? `Bearer ${JSON.parse(token)}` : undefined,
    },
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
