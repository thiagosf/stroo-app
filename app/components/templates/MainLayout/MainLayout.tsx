import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'

import configUtils from '../../../helpers/config_utils'
import { CookieBanner } from '../../organisms/CookieBanner/CookieBanner'
import { LoginModal } from '../../organisms/LoginModal/LoginModal'
import { UserContext, UserContextProps } from '../../../contexts/user_context'
import { GITHUB_AUTH_URL, PRIVATE_PROFILE } from '../../../queries/user_queries'
import { useLocalStorage } from '../../../hooks/use_local_storage'

export interface SeoMeta {
  title: string;
  description: string;
  image?: string;
}

export interface Props {
  seo?: SeoMeta;
  children?: React.ReactNode;
}

export const MainLayout: React.FC<Props> = function ({ seo, children }) {
  const router = useRouter()
  const [openedLoginModal, setOpenedLoginModal] = useState(false)
  const [loadingAuthURL, setLoadingAuthURL] = useState(false)
  const [, setLastPage] = useLocalStorage<string>('last_page', null)
  const [token, setToken] = useLocalStorage('token', null)
  const { data: urlData } = useQuery(GITHUB_AUTH_URL)
  const { data: profileData } = useQuery(PRIVATE_PROFILE)

  const [userContextValue, setUserContextValue] = useState<UserContextProps>({
    currentUser: null,
    onLogout: () => {
      setToken(null)
      setUserContextValue((d) => ({
        ...d,
        currentUser: undefined
      }))
    },
    openModal: () => setOpenedLoginModal(() => true),
    closeModal: () => setOpenedLoginModal(() => false),
  })

  const title = seo?.title
    ? `${seo.title} / ${configUtils.siteName}`
    : configUtils.siteName
  const description = seo?.description
    ? seo.description
    : 'Lorem ipsum'

  async function onLogin() {
    setLoadingAuthURL(true)
    setLastPage(router.asPath)
    document.location.href = urlData.githubAuthURL
  }

  useEffect(() => {
    if (profileData) {
      setUserContextValue((d) => ({
        ...d,
        currentUser: {
          name: profileData.me.name,
          username: profileData.me.username,
          avatar: profileData.me.avatar,
          token,
        }
      }))
    }
  }, [profileData])

  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserContext.Provider value={userContextValue}>
        <div className=" bg-gradient-to-tr from-gray-900 to-gray-800 text-white flex min-h-screen lg:overflow-hidden lg:h-screen">
          {children}
        </div>
        <CookieBanner />
        <LoginModal
          loading={loadingAuthURL}
          opened={openedLoginModal}
          onLogin={onLogin}
          onClose={userContextValue.closeModal}
        />
      </UserContext.Provider>
    </div>
  )
}
