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

StructurePage.getInitialProps = function () {
  const data: StructureEntity = {
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
    date: (new Date()).toUTCString(),
    link: '/new',
    user: {
      name: "You",
      username: "you",
      avatar: "",
    }
  }
  return {
    data
  }
}

export default StructurePage
