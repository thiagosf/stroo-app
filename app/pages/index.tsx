import Head from 'next/head'
import { NextPage } from 'next'
import { MainLayout } from '../components/templates/MainLayout/MainLayout'
import configUtils from '../helpers/config_utils'
import { FolderPreview } from '../components/organisms/FolderPreview/FolderPreview'

interface Props {}

const Home: NextPage<Props> = () => {
  return (
    <div className="">
      <Head>
        <title>{configUtils.siteName}</title>
        <meta name="description" content="Lorem ipsum lamet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <FolderPreview />
      </MainLayout>
    </div>
  )
}

export default Home
