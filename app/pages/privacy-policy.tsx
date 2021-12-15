import { NextPage } from 'next'
import { PrivacyPolicy } from '../components/organisms/PrivacyPolicy/PrivacyPolicy'
import { MainLayout, SeoMeta } from '../components/templates/MainLayout/MainLayout'

interface Props { }

const PrivacyPolicyPage: NextPage<Props> = ({ }) => {
  const seo: SeoMeta = {
    title: 'Privacy Policy',
    description: 'Check our privacy policy',
  }
  return (
    <MainLayout seo={seo}>
      <PrivacyPolicy />
    </MainLayout>
  )
}

export default PrivacyPolicyPage
