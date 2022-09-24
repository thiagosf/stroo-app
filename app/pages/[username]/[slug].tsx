import { useContext, useEffect } from 'react'
import { NextPage } from 'next'

import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import { StructureBuilderPreview } from '../../components/organisms/StructureBuilderPreview/StructureBuilderPreview'
import { UserEntity } from '../../contexts/user_context'
import { SiteContext } from '../../contexts/site_context'
import { SHOW_STRUCTURE } from '../../queries/structure_queries'
import { parseCodeFromSlug } from '../../helpers/structure_utils'
import { useFavorite } from '../../hooks/use_favorite'
import { apolloClient } from '../../lib/apollo_client'
import { removeMarkdown } from '../../helpers/folder_utils'
import { removeBreakLines, truncate } from '../../helpers/string_utils'
import configUtils from '../../helpers/config_utils'

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
  structure?: StructureEntity;
}

const StructurePage: NextPage<Props> = ({ structure }) => {
  const siteContextValue = useContext(SiteContext)
  const [onFavorite] = useFavorite()
  const seoStructure = siteContextValue.structure
    ? siteContextValue.structure
    : structure

  const seo: SeoMeta = {
    title: `${seoStructure.name} by @${seoStructure.user.username}`,
    description: removeBreakLines(truncate(removeMarkdown(seoStructure.content), 255)),
    image: `${configUtils.assetsURL}/files/structures/${seoStructure.code}.png`
  }

  async function onComplain(entity: StructureEntity) {
    console.log('onComplain', entity)
  }

  useEffect(() => {
    siteContextValue.setStructure(structure)
  }, [])

  return (
    <MainLayout seo={seo}>
      {siteContextValue.structure && (
        <StructureBuilderPreview
          onFavorite={onFavorite}
          onComplain={onComplain}
        />
      )}
    </MainLayout>
  )
}

export async function getServerSideProps({ query }) {
  const code = parseCodeFromSlug(query.slug.toString())
  const { data } = await apolloClient.query({
    query: SHOW_STRUCTURE,
    variables: { code }
  })
  const structure = data ? data.getStructure : null
  if (!structure) {
    return {
      notFound: true
    }
  }
  const props = { structure }
  return { props }
}

export default StructurePage
