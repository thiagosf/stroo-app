import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import { Spinner } from '../../components/atoms/Spinner/Spinner'
import { Profile } from '../../components/organisms/Profile/Profile'
import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import { formatItem } from '../../helpers/structure_utils'
import { LIST_STRUCTURES } from '../../queries/structure_queries'
import { PUBLIC_PROFILE } from '../../queries/user_queries'

import NotFoundPage from '../404'

export interface Props {
  username: string;
}

const AuthorPage: NextPage<Props> = ({ username }) => {
  const { data: userData, loading: userLoading } = useQuery(PUBLIC_PROFILE, {
    variables: { username }
  })
  const { data: structuresData, loading: structuresLoading } = useQuery(LIST_STRUCTURES, {
    variables: {
      filters: {
        username
      }
    }
  })

  if (userLoading || structuresLoading) {
    return <Spinner />
  }

  if (!userData) {
    return <NotFoundPage />
  }

  const structures = (structuresData?.listStructures ?? []).map(formatItem)
  const { profile: user } = userData
  const seo: SeoMeta = {
    title: user.name,
    description: `Structures by ${user.name}`,
  }

  return (
    <MainLayout seo={seo}>
      <Profile user={user} structures={structures} />
    </MainLayout>
  )
}

AuthorPage.getInitialProps = function ({ query }) {
  const username = (query.username.toString() ?? '').substring(1)
  return { username }
}

export default AuthorPage
