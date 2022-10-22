import { NextPage } from 'next'
import { Wrapper } from '../components/atoms/Wrapper/Wrapper'
import { NotFound } from '../components/organisms/NotFound/NotFound'
import { EmbedLayout } from '../components/templates/EmbedLayout/EmbedLayout'
import { MainLayout, SeoMeta } from '../components/templates/MainLayout/MainLayout'
import { isInsideIframe } from '../helpers/iframe_utils'

const NotFoundPage: NextPage = () => {
  const seo: SeoMeta = {
    title: 'Not Found',
    description: 'This page does not exists',
  }

  if (isInsideIframe()) {
    return (
      <EmbedLayout>
        <div className="p-4">
          <NotFound
            title="Structure not found"
            hideNavigation
          />
        </div>
      </EmbedLayout>
    )
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
