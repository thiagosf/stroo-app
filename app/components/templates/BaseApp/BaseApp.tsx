import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { Alert, SiteContext, SiteContextProps } from '../../../contexts/site_context'
import { UserContext, UserContextProps } from '../../../contexts/user_context'
import { useLocalStorage } from '../../../hooks/use_local_storage'
import { GITHUB_AUTH_URL } from '../../../queries/user_queries'
import { StructureEntity } from '../../../pages/[username]/[slug]'

import { AlertModal } from '../../organisms/AlertModal/AlertModal'
import { CookieBanner } from '../../organisms/CookieBanner/CookieBanner'
import { LoginModal } from '../../organisms/LoginModal/LoginModal'
import { FullSpinner } from '../../molecules/FullSpinner/FullSpinner'
import { event } from '../../../helpers/gtag'
import { AboutModal } from '../../organisms/AboutModal/AboutModal'

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
  const { data: urlData } = useQuery(GITHUB_AUTH_URL)

  const [siteContextValue, setSiteContextValue] = useState<SiteContextProps>({
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

  async function onLogin() {
    event({ action: 'login' })
    setLoadingAuthURL(true)
    setLastPage(router.asPath)
    document.location.href = urlData.githubAuthURL
  }

  useEffect(() => {
    siteContextValue.setFullLoading(false)
  }, [router.pathname])

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
