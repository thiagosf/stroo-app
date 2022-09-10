import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import { MainLayout } from '../../components/templates/MainLayout/MainLayout'
import { Spinner } from '../../components/atoms/Spinner/Spinner'
import { AUTHORIZE_WITH_GITHUB } from '../../queries/user_queries'
import { useLocalStorage } from '../../hooks/use_local_storage'
import { UserContextProps } from '../../contexts/user_context'

interface Props {
  code?: string;
}

const LoginCallback: NextPage<Props> = ({ code }) => {
  const router = useRouter()
  const [auth] = useMutation(AUTHORIZE_WITH_GITHUB)
  const [, setToken] = useLocalStorage<string>('token', null)
  const [lastPage, setLastPage] = useLocalStorage<string>('last_page', null)
  const [, setUserContextValue] = useState<UserContextProps>()

  useEffect(() => {
    async function doAuth() {
      try {
        if (!code) return router.push('/')
        await auth({
          variables: { code },
          onCompleted(data) {
            setLastPage('')
            let query = {}
            if (data) {
              setToken(data.authorizeWithGithub.token)
              setUserContextValue((d) => ({
                ...d,
                currentUser: {
                  name: data.authorizeWithGithub.user.name,
                  username: data.authorizeWithGithub.user.username,
                  avatar: data.authorizeWithGithub.user.avatar,
                  token: data.authorizeWithGithub.token,
                }
              }))
            } else {
              query = {
                error: 'invalid_code'
              }
            }
            router.push({ pathname: lastPage, query })
          }
        })
      } catch (error) {
        router.push({
          pathname: lastPage,
          query: {
            error: 'unknown'
          }
        })
      }
    }

    doAuth()
  }, [code])

  return (
    <MainLayout>
      <div className="p-12 text-center">
        <Spinner />
      </div>
    </MainLayout>
  )
}

LoginCallback.getInitialProps = function ({ query }) {
  const code = query.code?.toString()
  return { code }
}

export default LoginCallback
