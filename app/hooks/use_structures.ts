import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { LIST_STRUCTURES } from '../queries/structure_queries'
import { formatItem } from '../helpers/structure_utils'
import { StructureEntity } from '../pages/[username]/[slug]';

export function useStructures(filters: any):
  [
    StructureEntity[],
    boolean,
    () => Promise<void>
  ] {
  const { data, loading, fetchMore } = useQuery(LIST_STRUCTURES, {
    variables: { filters }
  })

  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState([])

  async function loadMore() {
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

  return [list, loading, loadMore]
}
