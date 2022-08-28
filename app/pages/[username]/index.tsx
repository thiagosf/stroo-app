import { NextPage } from 'next'
import { Profile } from '../../components/organisms/Profile/Profile'
import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import NotFoundPage from '../404'
import { StructureEntity } from './[slug]'

export interface AuthorEntity {
  username: string;
  avatar: string;
  list: StructureEntity[];
}

interface Props {
  data?: AuthorEntity;
  notFound?: boolean;
}

const AuthorPage: NextPage<Props> = ({ data, notFound }) => {
  if (notFound) {
    return <NotFoundPage />
  }
  const seo: SeoMeta = {
    title: data.username,
    description: `Structures by ${data.username}`,
  }
  return (
    <MainLayout seo={seo}>
      <Profile username={data} />
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

  const item = {
    code: "56sdf89a",
    name: "react-boilerplate-v1",
    username: "Ron Von Bauer",
    avatar: "https://picsum.photos/512/512",
    type: "react",
    content: "# introduction\n\nlorem\n\n## public/assets/images\n\npublic images\n\n## .github/workflows/master.yml\n\nDeploy production\n\n## .github/workflows/integration.yml\n\nDeploy integration\n\n## next.config.js\n\n```json\n{ \"success\": true }\n```\n\n## App.tsx\n\n```ts\nexport interface Some { }\n```\n\n",
    date: (new Date()).toUTCString(),
    link: '/@ron-von-bauer/react-boilerplate-v1-56sdf89a'
  }
  const data = {
    username: item.username,
    avatar: "https://picsum.photos/512/512",
    list: [
      item,
      item,
      item,
    ]
  }
  return {
    data
  }
}

export default AuthorPage
