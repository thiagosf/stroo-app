import { ApolloProvider } from '@apollo/client'
import 'tailwindcss/tailwind.css'

import { apolloClient } from '../lib/apollo_client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
