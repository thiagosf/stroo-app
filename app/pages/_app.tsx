import { ApolloProvider } from '@apollo/client'

import { apolloClient } from '../lib/apollo_client'
import '../styles/global.css'
import { BaseApp } from '../components/templates/BaseApp/BaseApp'

function MyApp(props: any) {
  return (
    <ApolloProvider client={apolloClient}>
      <BaseApp {...props} />
    </ApolloProvider>
  )
}

export default MyApp
