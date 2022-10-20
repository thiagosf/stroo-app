import { useEffect, useRef, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { Alert, SiteContext, SiteContextProps, Theme } from '../../../contexts/site_context'
import { UserContext, UserContextProps } from '../../../contexts/user_context'
import { useLocalStorage } from '../../../hooks/use_local_storage'
import { GITHUB_AUTH_URL, TWITTER_AUTH_URL } from '../../../queries/user_queries'
import { StructureEntity } from '../../../pages/[username]/[slug]'

import { AlertModal } from '../../organisms/AlertModal/AlertModal'
import { CookieBanner } from '../../organisms/CookieBanner/CookieBanner'
import { AuthService, LoginModal } from '../../organisms/LoginModal/LoginModal'
import { FullSpinner } from '../../molecules/FullSpinner/FullSpinner'
import { event } from '../../../helpers/gtag'
import { AboutModal } from '../../organisms/AboutModal/AboutModal'
import { isInsideIframe } from '../../../helpers/iframe_utils'

export interface Props {
  Component: any;
  pageProps: any;
}

export const BaseApp: React.FC<Props> = function ({ Component, pageProps }) {
  const router = useRouter()
  const alertTimer = useRef<any>()
  const [, setToken] = useLocalStorage('token', null)
  const [openedLoginModal, setOpenedLoginModal] = useState(false)
  const [loadingAuthURL, setLoadingAuthURL] = useState(false)
  const [, setLastPage] = useLocalStorage<string>('last_page', null)
  const [githubAuthURL] = useLazyQuery(GITHUB_AUTH_URL)
  const [twitterAuthURL] = useLazyQuery(TWITTER_AUTH_URL)
  const themeParam = isInsideIframe() ? router.query.theme : null

  const [siteContextValue, setSiteContextValue] = useState<SiteContextProps>({
    theme: 'dark',
    fullLoading: false,
    setAlert: (alert: Alert) => {
      setSiteContextValue((data) => ({ ...data, alert }))
      clearTimeout(alertTimer.current)
      alertTimer.current = setTimeout(() => siteContextValue.cleanAlert(), alert.delay ?? 3000)
    },
    cleanAlert: () => {
      setSiteContextValue((data) => ({ ...data, isLeaving: true }))
      clearTimeout(alertTimer.current)
      alertTimer.current = setTimeout(() => {
        setSiteContextValue((data) => ({ ...data, isLeaving: false, alert: undefined }))
      }, 400)
    },
    setStructure: (structure: StructureEntity) => {
      setSiteContextValue((data) => ({ ...data, structure }))
    },
    setFullLoading(fullLoading: boolean) {
      setSiteContextValue((data) => ({ ...data, fullLoading }))
    },
    setIsShowingAbout(isShowingAbout: boolean) {
      setSiteContextValue((data) => ({ ...data, isShowingAbout }))
    },
    setTheme(theme: Theme) {
      setSiteContextValue((data) => ({ ...data, theme }))
    }
  })

  const [userContextValue, setUserContextValue] = useState<UserContextProps>({
    currentUser: null,
    setCurrentUser: (currentUser) => {
      setUserContextValue((data) => ({ ...data, currentUser }))
    },
    onLogout: () => {
      setToken(null)
      setUserContextValue((data) => ({ ...data, currentUser: undefined }))
    },
    openModal: () => {
      event({ action: 'open_login_modal' })
      setOpenedLoginModal(() => true)
    },
    closeModal: () => {
      event({ action: 'close_login_modal' })
      setOpenedLoginModal(() => false)
    },
  })

  async function onLogin(provider: AuthService) {
    event({ action: 'login' })
    setLoadingAuthURL(true)
    setLastPage(router.asPath)
    try {
      const providers = {
        github: async (): Promise<string> => {
          const urlData = await githubAuthURL()
          console.log('github', urlData)
          return urlData.data.githubAuthURL
        },
        twitter: async (): Promise<string> => {
          const urlData = await twitterAuthURL()
          console.log('twitter', urlData)
          return urlData.data.twitterAuthURL
        },
      }
      if (!providers[provider]) throw new Error('Invalid provider')
      document.location.href = await providers[provider]()
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    siteContextValue.setFullLoading(false)
  }, [router.pathname])

  useEffect(() => {
    if (themeParam) siteContextValue.setTheme(themeParam as Theme)
  }, [themeParam])

  return (
    <SiteContext.Provider value={siteContextValue}>
      <UserContext.Provider value={userContextValue}>
        {siteContextValue.fullLoading && (
          <FullSpinner />
        )}
        <Component {...pageProps} />
        <CookieBanner />
        <AlertModal
          alert={siteContextValue.alert}
          isLeaving={siteContextValue.isLeaving}
          onClose={siteContextValue.cleanAlert}
        />
        <LoginModal
          loading={loadingAuthURL}
          opened={openedLoginModal}
          onLogin={onLogin}
          onClose={userContextValue.closeModal}
        />
        <AboutModal
          opened={siteContextValue.isShowingAbout}
        />
      </UserContext.Provider>
    </SiteContext.Provider>
  )
}
