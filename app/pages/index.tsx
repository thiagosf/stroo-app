import { NextPage } from 'next'
import { Landing } from '../components/organisms/Landing/Landing'
import { MainLayout } from '../components/templates/MainLayout/MainLayout'

interface Props { }

const HomePage: NextPage<Props> = ({ }) => {
  return (
    <MainLayout>
      <Landing />
    </MainLayout>
  )
}

// HomePage.getInitialProps = function () {
//   return {}
// }

export default HomePage
