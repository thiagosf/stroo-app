import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

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
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState([])

  const { data, loading, fetchMore } = useQuery(LIST_STRUCTURES, {
    variables: { filters }
  })

  async function handleLoadMore() {
    if (loadingMore || !hasMore) return
    const newPage = page + 1
    setPage(() => newPage)
    setLoadingMore(() => true)
    const { data } = await fetchMore({
      variables: {
        filters: {
          ...filters,
          page: newPage
        },
      },
    })
    setList((list) => [...list, ...(data?.listStructures ?? []).map(formatItem)])
    setLoadingMore(() => false)
    setHasMore(() => data.listStructures.length > 0)
  }

  useEffect(() => {
    setList(() => (data?.listStructures ?? []).map(formatItem))
  }, [data?.listStructures])

  return (
    <MainLayout seo={seo}>
      <Browse loading={loading} list={list} loadMore={handleLoadMore} />
    </MainLayout>
  )
}

BrowsePage.getInitialProps = function ({ query }) {
  const filters = {
    type: query.type?.toString(),
    search: query.search?.toString(),
    username: query.username?.toString(),
    limit: 20,
  }

  return { filters }
}

export default BrowsePage
