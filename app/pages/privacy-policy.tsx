import { NextPage } from 'next'
import { PrivacyPolicy } from '../components/organisms/PrivacyPolicy/PrivacyPolicy'
import { MainLayout } from '../components/templates/MainLayout/MainLayout'

interface Props {}

const PrivacyPolicyPage: NextPage<Props> = ({}) => {
  return (
    <MainLayout>
      <PrivacyPolicy />
    </MainLayout>
  )
}

export default PrivacyPolicyPage
