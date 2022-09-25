import { NextPage } from 'next'

import { Profile } from '../../components/organisms/Profile/Profile'
import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import { useStructures } from '../../hooks/use_structures'
import { apolloClient } from '../../lib/apollo_client'
import { PUBLIC_PROFILE } from '../../queries/user_queries'

export interface Props {
  user: any;
}

const AuthorPage: NextPage<Props> = ({ user }) => {
  const [list, structuresLoading, loadMoreStructures] = useStructures({
    username: user.username,
    limit: 20
  })

  const seo: SeoMeta = {
    title: user ? `@${user.username}` : 'User not found',
    description: user ? `Structures by @${user.username}` : 'User not found',
  }

  return (
    <MainLayout seo={seo}>
      <Profile
        user={user}
        structures={list}
        structuresLoading={structuresLoading}
        loadMoreStructures={loadMoreStructures}
      />
    </MainLayout>
  )
}

export async function getServerSideProps({ query }) {
  const username = (query.username.toString() ?? '').substring(1)

  const { data } = await apolloClient.query({
    query: PUBLIC_PROFILE,
    variables: { username }
  })
  const user = data ? data.profile : null
  if (!user) {
    return {
      notFound: true
    }
  }
  const props = { user }
  return { props }
}

export default AuthorPage
