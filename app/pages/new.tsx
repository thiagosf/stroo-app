import { NextPage } from 'next'
import { MainLayout, SeoMeta } from '../components/templates/MainLayout/MainLayout'
import { FolderPreview } from '../components/organisms/FolderPreview/FolderPreview'
import { StructureEntity } from './[username]/[slug]'

interface Props {
  data: StructureEntity;
}

const StructurePage: NextPage<Props> = ({ data }) => {
  const seo: SeoMeta = {
    title: 'New Structure',
    description: 'Create a new project structure reference',
  }
  return (
    <MainLayout seo={seo}>
      <FolderPreview entity={data} />
    </MainLayout>
  )
}

StructurePage.getInitialProps = function (context) {
  const data = {
    code: "...",
    name: "new-structure",
    author: "You",
    avatar: "",
    type: "type",
    structure: [
      "# Introduction",
      "Format with `Markdown`, use double `#` to create your folders/files list. Like that:",
      "## app/src",
      "Separete your tree with slashes and create files inside folders:",
      "## app/src/tsconfig.json",
      "```json\n{ \"compilerOptions\": ... }\n```",
      "## Readme.md",
      "And... That's all! Start now, share and store your project folders structure.",
      "😎",
    ].join("\n\n"),
    date: (new Date()).toUTCString(),
    link: '/new'
  }
  return {
    data
  }
}

export default StructurePage
