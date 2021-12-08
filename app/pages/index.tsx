import { NextPage } from 'next'
import { MainLayout } from '../components/templates/MainLayout/MainLayout'

interface Props {}

const Home: NextPage<Props> = ({}) => {
  return (
    <MainLayout>
      home
    </MainLayout>
  )
}

Home.getInitialProps = function () {
  return {}
}

export default Home
