import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import { Spinner } from '../../components/atoms/Spinner/Spinner'
import { NotFound } from '../../components/organisms/NotFound/NotFound'
import { Profile } from '../../components/organisms/Profile/Profile'
import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import { useStructures } from '../../hooks/use_structures'
import { PUBLIC_PROFILE } from '../../queries/user_queries'

export interface Props {
  username: string;
}

const AuthorPage: NextPage<Props> = ({ username }) => {
  const { data: userData, loading: userLoading } = useQuery(PUBLIC_PROFILE, {
    variables: { username }
  })
  const [list, structuresLoading, loadMoreStructures] = useStructures({ username, limit: 20 })

  const { profile: user } = userData ?? {}
  const seo: SeoMeta = {
    title: user ? `@${user.username}` : '...',
    description: user ? `Structures by @${user.username}` : '...',
  }

  return (
    <MainLayout seo={seo}>
      {userLoading && (
        <div className="flex justify-center items-center grow">
          <Spinner />
        </div>
      )}
      {!userLoading && !user && (
        <div className="flex justify-center items-center grow">
          <NotFound />
        </div>
      )}
      {!userLoading && user && (
        <Profile
          user={user}
          structures={list}
          structuresLoading={structuresLoading}
          loadMoreStructures={loadMoreStructures}
        />
      )}
    </MainLayout>
  )
}

AuthorPage.getInitialProps = function ({ query }) {
  const username = (query.username.toString() ?? '').substring(1)
  return { username }
}

export default AuthorPage
