import { NextPage } from 'next'
import { Wrapper } from '../components/atoms/Wrapper/Wrapper'
import { NotFound } from '../components/organisms/NotFound/NotFound'
import { MainLayout, SeoMeta } from '../components/templates/MainLayout/MainLayout'

const NotFoundPage: NextPage = () => {
  const seo: SeoMeta = {
    title: 'Not Found',
    description: 'This page does not exists',
  }
  return (
    <MainLayout seo={seo}>
      <Wrapper>
        <NotFound />
      </Wrapper>
    </MainLayout>
  )
}

export default NotFoundPage
