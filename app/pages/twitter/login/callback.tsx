import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import { MainLayout } from '../../../components/templates/MainLayout/MainLayout'
import { Spinner } from '../../../components/atoms/Spinner/Spinner'
import { AUTHORIZE_WITH_TWITTER } from '../../../queries/user_queries'
import { useLocalStorage } from '../../../hooks/use_local_storage'
import { UserContextProps } from '../../../contexts/user_context'

interface Props {
  code?: string;
  state?: string;
}

const LoginCallback: NextPage<Props> = ({ code, state }) => {
  const router = useRouter()
  const [auth] = useMutation(AUTHORIZE_WITH_TWITTER)
  const [, setToken] = useLocalStorage<string>('token', null)
  const [lastPage, setLastPage] = useLocalStorage<string>('last_page', null)
  const [, setUserContextValue] = useState<UserContextProps>()

  useEffect(() => {
    async function doAuth() {
      try {
        if (!code || !state) return router.push('/')
        await auth({
          variables: { code, state },
          onCompleted(data) {
            setLastPage('')
            let query = {}
            if (data) {
              setToken(data.authorizeWithTwitter.token)
              setUserContextValue((d) => ({
                ...d,
                currentUser: {
                  name: data.authorizeWithTwitter.user.name,
                  username: data.authorizeWithTwitter.user.username,
                  avatar: data.authorizeWithTwitter.user.avatar,
                  token: data.authorizeWithTwitter.token,
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
  }, [code, state])

  return (
    <MainLayout>
      <div className="flex grow justify-center items-center p-12">
        <Spinner />
      </div>
    </MainLayout>
  )
}

LoginCallback.getInitialProps = function ({ query }) {
  const code = query.code?.toString()
  const state = query.state?.toString()
  return { code, state }
}

export default LoginCallback
