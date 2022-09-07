import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { UserContext, UserContextProps } from '../../../contexts/user_context'
import { Alert, SiteContext, SiteContextProps } from '../../../contexts/site_context'
import configUtils from '../../../helpers/config_utils'
import { useLocalStorage } from '../../../hooks/use_local_storage'
import { GITHUB_AUTH_URL, PRIVATE_PROFILE } from '../../../queries/user_queries'

import { AlertModal } from '../../organisms/AlertModal/AlertModal'
import { CookieBanner } from '../../organisms/CookieBanner/CookieBanner'
import { LoginModal } from '../../organisms/LoginModal/LoginModal'

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
  const alertTimer = useRef<any>()

  const [siteContextValue, setSiteContextValue] = useState<SiteContextProps>({
    setAlert: (alert: Alert) => {
      setSiteContextValue((data) => ({ ...data, alert }))
      clearTimeout(alertTimer.current)
      alertTimer.current = setTimeout(() => siteContextValue.clean(), alert.delay ?? 3000)
    },
    clean: () => {
      setSiteContextValue((data) => ({ ...data, isLeaving: true }))
      clearTimeout(alertTimer.current)
      alertTimer.current = setTimeout(() => {
        setSiteContextValue((data) => ({ ...data, isLeaving: false, alert: undefined }))
      }, 400)
    },
  })

  const [userContextValue, setUserContextValue] = useState<UserContextProps>({
    currentUser: null,
    onLogout: () => {
      setToken(null)
      setUserContextValue((data) => ({ ...data, currentUser: undefined }))
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
      setUserContextValue((data) => ({
        ...data,
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
      <SiteContext.Provider value={siteContextValue}>
        <UserContext.Provider value={userContextValue}>
          <div className=" bg-gradient-to-tr from-gray-900 to-gray-800 text-white flex min-h-screen lg:overflow-hidden lg:h-screen">
            {children}
          </div>
          <CookieBanner />
          <AlertModal
            alert={siteContextValue.alert}
            isLeaving={siteContextValue.isLeaving}
            onClose={siteContextValue.clean}
          />
          <LoginModal
            loading={loadingAuthURL}
            opened={openedLoginModal}
            onLogin={onLogin}
            onClose={userContextValue.closeModal}
          />
        </UserContext.Provider>
      </SiteContext.Provider>
    </div>
  )
}
