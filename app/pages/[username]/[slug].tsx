import { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'

import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import { StructureBuilderPreview } from '../../components/organisms/StructureBuilderPreview/StructureBuilderPreview'
import { UserEntity } from '../../contexts/user_context'
import { SiteContext } from '../../contexts/site_context'
import { SHOW_STRUCTURE } from '../../queries/structure_queries'
import { formatItem, parseCodeFromSlug } from '../../helpers/structure_utils'
import { useFavorite } from '../../hooks/use_favorite'
import { CustomSuspense } from '../../components/organisms/CustomSuspense/CustomSuspense'


export interface StructureEntity {
  code?: string;
  name: string;
  type: string;
  content: string;
  date?: string;
  link?: string;
  like_count: number;
  liked?: boolean;
  user: UserEntity;
}

interface Props {
  code: string;
}

const StructurePage: NextPage<Props> = ({ code }) => {
  const siteContextValue = useContext(SiteContext)
  const { data, loading } = useQuery(SHOW_STRUCTURE, {
    variables: { code }
  })
  const structure = data ? formatItem(data.getStructure) : null
  const [onFavorite] = useFavorite()

  useEffect(() => {
    if (structure && siteContextValue.structure?.code !== code) {
      siteContextValue.setStructure(structure)
    }
  }, [structure])

  const seo: SeoMeta = {
    title: siteContextValue.structure
      ? `${siteContextValue.structure?.name} by @${siteContextValue.structure?.user.username}`
      : '...',
    description: siteContextValue.structure
      ? `Structure by @${siteContextValue.structure?.user.username}`
      : '...',
  }

  async function onComplain(entity: StructureEntity) {
    console.log('onComplain', entity)
  }

  return (
    <MainLayout seo={seo}>
      <CustomSuspense
        loading={loading}
        notFound={!loading && !structure}
      >
        {siteContextValue.structure && (
          <StructureBuilderPreview
            onFavorite={onFavorite}
            onComplain={onComplain}
          />
        )}
      </CustomSuspense>
    </MainLayout>
  )
}

StructurePage.getInitialProps = function ({ query }) {
  const code = parseCodeFromSlug(query.slug.toString())
  return { code }
}

export default StructurePage
