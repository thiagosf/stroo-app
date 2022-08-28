import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import { Browse } from '../components/organisms/Browse/Browse'
import { MainLayout, SeoMeta } from '../components/templates/MainLayout/MainLayout'
import { formatItem } from '../helpers/structure_utils'
import { LIST_STRUCTURES } from '../queries/structure_queries'

interface Props {
  filters: any
}

const BrowsePage: NextPage<Props> = ({ filters }) => {
  const seo: SeoMeta = {
    title: 'Browse',
    description: 'Search and browse project structure reference',
  }
  const { data, loading } = useQuery(LIST_STRUCTURES, {
    variables: { filters }
  })
  const list = (data?.listStructures ?? []).map(formatItem)

  return (
    <MainLayout seo={seo}>
      <Browse loading={loading} list={list} />
    </MainLayout>
  )
}

BrowsePage.getInitialProps = function ({ query }) {
  const filters = {
    type: query.type?.toString(),
    search: query.search?.toString(),
    username: query.username?.toString()
  }

  return { filters }
}

export default BrowsePage
