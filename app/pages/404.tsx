import { NextPage } from 'next'
import Head from 'next/head'
import { Wrapper } from '../components/atoms/Wrapper/Wrapper'
import { NotFound } from '../components/organisms/NotFound/NotFound'
import { MainLayout } from '../components/templates/MainLayout/MainLayout'
import configUtils from '../helpers/config_utils'

const NotFoundPage: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>{configUtils.siteName}</title>
        <meta name="description" content="Lorem ipsum lamet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Wrapper>
          <NotFound />
        </Wrapper>
      </MainLayout>
    </div>
  )
}

export default NotFoundPage
