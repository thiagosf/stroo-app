import { NextPage } from 'next'

import { Profile } from '../../components/organisms/Profile/Profile'
import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import { UserEntity } from '../../contexts/user_context'

import NotFoundPage from '../404'

import { StructureEntity } from './[slug]'

interface Props {
  user?: UserEntity;
  structures?: Array<StructureEntity>;
  notFound?: boolean;
}

const AuthorPage: NextPage<Props> = ({ user, structures, notFound }) => {
  if (notFound) {
    return <NotFoundPage />
  }
  const seo: SeoMeta = {
    title: user.name,
    description: `Structures by ${user.name}`,
  }
  return (
    <MainLayout seo={seo}>
      <Profile user={user} structures={structures} />
    </MainLayout>
  )
}

AuthorPage.getInitialProps = function (context) {
  if (context.query.username[0] !== '@') {
    context.res.statusCode = 404
    return {
      notFound: true
    }
  }

  const item: StructureEntity = {
    code: "56sdf89a",
    name: "react-boilerplate-v1",
    type: "react",
    content: "# introduction\n\nlorem\n\n## public/assets/images\n\npublic images\n\n## .github/workflows/master.yml\n\nDeploy production\n\n## .github/workflows/integration.yml\n\nDeploy integration\n\n## next.config.js\n\n```json\n{ \"success\": true }\n```\n\n## App.tsx\n\n```ts\nexport interface Some { }\n```\n\n",
    date: (new Date()).toUTCString(),
    link: '/@ron-von-bauer/react-boilerplate-v1-56sdf89a',
    user: {
      name: "Ron Von Bauer",
      username: "ron",
      avatar: "https://picsum.photos/512/512",
    }
  }

  return { user: item.user, structures: [item] }
}

export default AuthorPage
