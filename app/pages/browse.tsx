import { NextPage } from 'next'

import { Browse } from '../components/organisms/Browse/Browse'
import { MainLayout, SeoMeta } from '../components/templates/MainLayout/MainLayout'
import { useStructures } from '../hooks/use_structures'

interface Props {
  filters: any
}

const BrowsePage: NextPage<Props> = ({ filters }) => {
  const seo: SeoMeta = {
    title: 'Browse',
    description: 'Search and browse project structure reference',
  }
  const [list, loading, loadMore] = useStructures(filters)

  return (
    <MainLayout seo={seo}>
      <Browse
        loading={loading}
        list={list}
        loadMore={loadMore}
      />
    </MainLayout>
  )
}

BrowsePage.getInitialProps = function ({ query }) {
  const filters = {
    type: query.type?.toString(),
    search: query.search?.toString(),
    username: query.username?.toString(),
    favorites: query.favorites?.toString() === 'true' ? true : undefined,
    limit: 20,
  }

  return { filters }
}

export default BrowsePage
