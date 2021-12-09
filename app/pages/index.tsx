import { NextPage } from 'next'
import { Landing } from '../components/organisms/Landing/Landing'
import { MainLayout } from '../components/templates/MainLayout/MainLayout'

interface Props {}

const Home: NextPage<Props> = ({}) => {
  return (
    <MainLayout>
      <Landing />
    </MainLayout>
  )
}

Home.getInitialProps = function () {
  return {}
}

export default Home
