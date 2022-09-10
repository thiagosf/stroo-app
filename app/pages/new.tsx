import { useContext, useEffect } from 'react'
import { NextPage } from 'next'

import { MainLayout, SeoMeta } from '../components/templates/MainLayout/MainLayout'
import { StructureBuilderPreview } from '../components/organisms/StructureBuilderPreview/StructureBuilderPreview'
import { SiteContext } from '../contexts/site_context'
import { unauthenticatedUser } from '../helpers/user_utils'

import { StructureEntity } from './[username]/[slug]'

interface Props {
  structure: StructureEntity;
}

const StructurePage: NextPage<Props> = ({ structure }) => {
  const siteContextValue = useContext(SiteContext)
  const seo: SeoMeta = {
    title: 'New Structure',
    description: 'Create a new project structure reference',
  }

  useEffect(() => {
    siteContextValue.setStructure(structure)
  }, [structure])

  return (
    <MainLayout seo={seo}>
      {siteContextValue.structure && (
        <StructureBuilderPreview />
      )}
    </MainLayout>
  )
}

StructurePage.getInitialProps = function () {
  const structure: StructureEntity = {
    code: "...",
    name: "new-structure",
    type: "type",
    content: [
      "# Introduction",
      "Format with [Markdown](https://www.markdownguide.org), use double `#` to create your folders/files list. Like that:",
      "## app/src",
      "Separete your tree with slashes and create files inside folders:",
      "## app/src/tsconfig.json",
      "```json\n{ \"compilerOptions\": ... }\n```",
      "## Readme.md",
      "If you prefer, you can export your tree structure from your terminal like that:",
      "```bash\ntree my-app | pbcopy\n```",
      "So you can paste it into the editor and convert it to _Markdown_.",
      "And... That's all! Start now, share and store your project folders structure.",
      "😎",
    ].join("\n\n"),
    like_count: 0,
    liked: false,
    date: (new Date()).toUTCString(),
    link: '/new',
    user: unauthenticatedUser()
  }
  return {
    structure
  }
}

export default StructurePage
