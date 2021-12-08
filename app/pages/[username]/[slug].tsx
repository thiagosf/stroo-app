import { NextPage } from 'next'
import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import { FolderPreview } from '../../components/organisms/FolderPreview/FolderPreview'

export interface StructureEntity {
  code: string;
  name: string;
  avatar: string;
  author: string;
  type: string;
  structure: string;
  date: string;
}

interface Props {
  data: StructureEntity
}

const Home: NextPage<Props> = ({ data }) => {
  const seo: SeoMeta = {
    title: `${data.name} by ${data.author}`,
    description: `Structure by ${data.author}`,
  }
  return (
    <MainLayout seo={seo}>
      <FolderPreview entity={data} />
    </MainLayout>
  )
}

Home.getInitialProps = function (context) {
  console.log('username', context.query.username)
  console.log('slug', context.query.slug)

  const data = {
    code: "56sdf89a",
    name: "react-boilerplate-v1",
    author: "Ron Von Bauer",
    avatar: "https://picsum.photos/512/512",
    type: "react",
    structure: "# introduction\n\nlorem ![alt text](https://images.unsplash.com/photo-1638548719890-850eb54bd059?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80 \"Image\")\n\n## public/assets/images\n\npublic images\n\n## .github/workflows/master.yml\n\nDeploy production\n\n## .github/workflows/integration.yml\n\nDeploy integration\n\n## next.config.js\n\n```json\n{ \"success\": true }\n```\n\n## App.tsx\n\n```ts\nexport interface Some { }\n```\n\n",
    date: (new Date()).toUTCString(),
  }
  return {
    data
  }
}

export default Home
