import { ApolloProvider } from '@apollo/client'
import 'tailwindcss/tailwind.css'

import BaseApp from '../components/templates/BaseApp/BaseApp'
import { apolloClient } from '../lib/apollo_client'
import '../styles/globals.css'

function MyApp(props: any) {
  return (
    <ApolloProvider client={apolloClient}>
      <BaseApp {...props} />
    </ApolloProvider>
  )
}

export default MyApp
