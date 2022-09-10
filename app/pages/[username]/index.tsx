import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import { Spinner } from '../../components/atoms/Spinner/Spinner'
import { Profile } from '../../components/organisms/Profile/Profile'
import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import { useStructures } from '../../hooks/use_structures'
import { PUBLIC_PROFILE } from '../../queries/user_queries'

import NotFoundPage from '../404'

export interface Props {
  username: string;
}

const AuthorPage: NextPage<Props> = ({ username }) => {
  const { data: userData, loading: userLoading } = useQuery(PUBLIC_PROFILE, {
    variables: { username }
  })
  const [list, structuresLoading, loadMoreStructures] = useStructures({ username, limit: 20 })

  if (userLoading) return <Spinner />

  if (!userData) return <NotFoundPage />

  const { profile: user } = userData
  const seo: SeoMeta = {
    title: user.name,
    description: `Structures by ${user.name}`,
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

AuthorPage.getInitialProps = function ({ query }) {
  const username = (query.username.toString() ?? '').substring(1)
  return { username }
}

export default AuthorPage
