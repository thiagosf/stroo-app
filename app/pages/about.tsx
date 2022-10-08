import { NextPage } from 'next'
import { Features } from '../components/organisms/Features/Features'

import { Landing } from '../components/organisms/Landing/Landing'
import { MainFooter } from '../components/organisms/MainFooter/MainFooter'
import { MainLayout } from '../components/templates/MainLayout/MainLayout'

interface Props { }

const HomePage: NextPage<Props> = ({ }) => {
  return (
    <MainLayout>
      <div className="flex flex-col grow min-h-full p-12 overflow-auto">
        <div className="flex min-h-[80vh]">
          <Landing />
        </div>
        <div className="mb-6 md:mb-40">
          <Features />
        </div>
        <MainFooter />
      </div>
    </MainLayout>
  )
}

export default HomePage
