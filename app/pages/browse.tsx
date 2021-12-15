import { NextPage } from 'next'
import { Browse } from '../components/organisms/Browse/Browse'
import { MainLayout, SeoMeta } from '../components/templates/MainLayout/MainLayout'
import { StructureEntity } from './[username]/[slug]'

interface Props {
  list: StructureEntity[]
}

const BrowsePage: NextPage<Props> = ({ list }) => {
  const seo: SeoMeta = {
    title: 'Browse',
    description: 'Search and browse project structure reference',
  }
  return (
    <MainLayout seo={seo}>
      <Browse list={list} />
    </MainLayout>
  )
}

BrowsePage.getInitialProps = function () {
  const item = {
    code: "56sdf89a",
    name: "react-boilerplate-v1",
    author: "Ron Von Bauer",
    avatar: "https://picsum.photos/512/512",
    type: "react",
    structure: "# introduction\n\nlorem ![alt text](https://images.unsplash.com/photo-1638548719890-850eb54bd059?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80 \"Image\")\n\n## public/assets/images\n\npublic images\n\n## .github/workflows/master.yml\n\nDeploy production\n\n## .github/workflows/integration.yml\n\nDeploy integration\n\n## next.config.js\n\n```json\n{ \"success\": true }\n```\n\n## App.tsx\n\n```ts\nexport interface Some { }\n```\n\n",
    date: (new Date()).toUTCString(),
    link: '/@ron-von-bauer/react-boilerplate-v1-56sdf89a'
  }

  const list = [
    item,
    item,
    item,
  ]

  return {
    list
  }
}

export default BrowsePage
