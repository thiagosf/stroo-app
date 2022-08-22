import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import { Browse } from '../components/organisms/Browse/Browse'
import { MainLayout, SeoMeta } from '../components/templates/MainLayout/MainLayout'
import { formatItem } from '../helpers/structure_utils'
import { LIST_STRUCTURES } from '../queries/structure_queries'

const BrowsePage: NextPage = () => {
  const seo: SeoMeta = {
    title: 'Browse',
    description: 'Search and browse project structure reference',
  }
  const { data } = useQuery(LIST_STRUCTURES)
  const list = (data?.listStructures ?? []).map(formatItem)

  return (
    <MainLayout seo={seo}>
      <Browse list={list} />
    </MainLayout>
  )
}

export default BrowsePage
