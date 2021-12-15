import { NextPage } from 'next'
import { MainLayout, SeoMeta } from '../../components/templates/MainLayout/MainLayout'
import { FolderPreview } from '../../components/organisms/FolderPreview/FolderPreview'
import NotFoundPage from '../404'

export interface StructureEntity {
  code: string;
  name: string;
  avatar: string;
  author: string;
  type: string;
  structure: string;
  date: string;
  link: string;
}

interface Props {
  data?: StructureEntity;
  notFound?: boolean;
}

const StructurePage: NextPage<Props> = ({ data, notFound }) => {
  if (notFound) {
    return <NotFoundPage />
  }
  const seo: SeoMeta = {
    title: `${data.name} by ${data.author}`,
    description: `Structure by ${data.author}`,
  }

  const onFavorite = (entity: StructureEntity) => {
    console.log('onFavorite', entity)
  }

  const onComplain = (entity: StructureEntity) => {
    console.log('onComplain', entity)
  }

  return (
    <MainLayout seo={seo}>
      <FolderPreview
        entity={data}
        onFavorite={onFavorite}
        onComplain={onComplain}
      />
    </MainLayout>
  )
}

StructurePage.getInitialProps = function (context) {
  if (context.query.username[0] !== '@') {
    context.res.statusCode = 404
    return {
      notFound: true
    }
  }

  console.log('username', context.query.username)
  console.log('slug', context.query.slug)

  const data = {
    code: "56sdf89a",
    name: "react-boilerplate-v1",
    author: "Ron Von Bauer",
    avatar: "https://picsum.photos/512/512",
    type: "react",
    structure: "# introduction\n\nlorem\n\n## public/assets/images\n\npublic images\n\n## .github/workflows/master.yml\n\nDeploy production\n\n## .github/workflows/integration.yml\n\nDeploy integration\n\n## next.config.js\n\n```json\n{ \"success\": true }\n```\n\n## App.tsx\n\n```ts\nexport interface Some { }\n```\n\n* [ ] to do\n* [x] done\n\n### A table\n\n| a | b  |  c |  d  |\n| - | :- | -: | :-: |\n| a | b  |  c |  d  |\n| a | b  |  ~c~ |  d  |\n| a | ~~b~~  |  *c* |  d  |",
    date: (new Date()).toUTCString(),
    link: '/@ron-von-bauer/react-boilerplate-v1-56sdf89a'
  }
  return {
    data
  }
}

export default StructurePage
