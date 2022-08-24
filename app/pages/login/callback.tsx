import { useEffect } from 'react'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'

import { MainLayout } from '../../components/templates/MainLayout/MainLayout'
import { Spinner } from '../../components/atoms/Spinner/Spinner'
import { AUTHORIZE_WITH_GITHUB } from '../../queries/user_queries'
import { useLocalStorage } from '../../hooks/use_local_storage'

interface Props {
  code?: string;
}

const LoginCallback: NextPage<Props> = ({ code }) => {
  const router = useRouter()
  const [auth, { data, loading }] = useMutation(AUTHORIZE_WITH_GITHUB)
  const [_, setToken] = useLocalStorage<string>('token', null)
  const user = data ? data.authorizeWithGithub : null

  useEffect(() => {
    try {
      auth({ variables: { code } })
    } catch (error) {
      console.log(error)
    }
  }, [code])

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log('user', user);
        console.log('user.token', user.token);

        setToken(user.token)
        router.push('/')
      } else {
        router.push('/?error=invalid_code')
      }
    }
  }, [loading, user])

  return (
    <MainLayout>
      <Spinner />
    </MainLayout>
  )
}

LoginCallback.getInitialProps = function ({ query }) {
  return {
    code: query.code.toString()
  }
}

export default LoginCallback
