import { NextPage } from 'next'
import { useQuery } from '@apollo/client'

import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import { StructureBuilderPreview } from '../../components/organisms/StructureBuilderPreview/StructureBuilderPreview'
import { formatItem, parseCodeFromSlug } from '../../helpers/structure_utils'
import { SHOW_STRUCTURE } from '../../queries/structure_queries'
import NotFoundPage from '../404'
import { UserEntity } from '../../contexts/user_context'

export interface StructureEntity {
  code?: string;
  name: string;
  type: string;
  content: string;
  date?: string;
  link?: string;
  user: UserEntity;
}

interface Props {
  code: string;
}

const StructurePage: NextPage<Props> = ({ code }) => {
  const { data, loading } = useQuery(SHOW_STRUCTURE, {
    variables: { code }
  })
  const structure = data ? formatItem(data.getStructure) : null

  if (loading) return <div>...</div>

  if (!structure) return <NotFoundPage />

  const seo: SeoMeta = {
    title: `${structure.name} by ${structure.user.name}`,
    description: `Structure by ${structure.user.name}`,
  }

  const onFavorite = (entity: StructureEntity) => {
    console.log('onFavorite', entity)
  }

  const onComplain = (entity: StructureEntity) => {
    console.log('onComplain', entity)
  }

  return (
    <MainLayout seo={seo}>
      <StructureBuilderPreview
        entity={structure}
        onFavorite={onFavorite}
        onComplain={onComplain}
      />
    </MainLayout>
  )
}

StructurePage.getInitialProps = function ({ query }) {
  const code = parseCodeFromSlug(query.slug.toString())
  return {
    code
  }
}

export default StructurePage
