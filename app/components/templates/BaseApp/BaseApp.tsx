import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { AlertModal } from '../../organisms/AlertModal/AlertModal'
import { CookieBanner } from '../../organisms/CookieBanner/CookieBanner'
import { LoginModal } from '../../organisms/LoginModal/LoginModal'

import { Alert, SiteContext, SiteContextProps } from '../../../contexts/site_context'
import { UserContext, UserContextProps } from '../../../contexts/user_context'
import { useLocalStorage } from '../../../hooks/use_local_storage'
import { GITHUB_AUTH_URL } from '../../../queries/user_queries'
import { StructureEntity } from '../../../pages/[username]/[slug]'

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
    openModal: () => setOpenedLoginModal(() => true),
    closeModal: () => setOpenedLoginModal(() => false),
  })

  async function onLogin() {
    setLoadingAuthURL(true)
    setLastPage(router.asPath)
    document.location.href = urlData.githubAuthURL
  }

  return (
    <SiteContext.Provider value={siteContextValue}>
      <UserContext.Provider value={userContextValue}>
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
      </UserContext.Provider>
    </SiteContext.Provider>
  )
}

export default BaseApp
