import Head from 'next/head'
import { NextPage } from 'next'
import { MainLayout } from '../components/templates/MainLayout/MainLayout'
import configUtils from '../helpers/config_utils'
import { FolderPreview } from '../components/organisms/FolderPreview/FolderPreview'

export interface StructreEntity {
  code: string;
  name: string;
  avatar: string;
  author: string;
  type: string;
  structure: string;
  date: string;
}

interface Props {
  data: StructreEntity
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <div className="">
      <Head>
        <title>{configUtils.siteName}</title>
        <meta name="description" content="Lorem ipsum lamet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <FolderPreview entity={data} />
      </MainLayout>
    </div>
  )
}

Home.getInitialProps = function () {
  const data = {
    code: "56sdf89as465fa48sf6a032dfa456sdf",
    name: "react-boilerplate-v1",
    author: "Ron Von Bauer",
    avatar: "https://picsum.photos/512/512",
    type: "react",
    structure: "# introduction\n\nlorem\n\n## public/assets/images\n\npublic images\n\n## .github/workflows/master.yml\n\nDeploy production\n\n## .github/workflows/integration.yml\n\nDeploy integration\n\n## next.config.js\n\n```json\n{ \"success\": true }\n```\n\n## App.tsx\n\n```ts\nexport interface Some { }\n```\n\n",
    date: (new Date()).toUTCString(),
  }
  return {
    data
  }
}

export default Home
