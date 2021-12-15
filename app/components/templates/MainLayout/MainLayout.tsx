import React from 'react'
import Head from 'next/head'
import configUtils from '../../../helpers/config_utils'
import { CookieBanner } from '../../organisms/CookieBanner/CookieBanner'
import { LoginModal } from '../../organisms/LoginModal/LoginModal'
import { UserContext, UserContextProps } from '../../../contexts/user_context'
import { useState } from 'react'

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
  const [openedLoginModal, setOpenedLoginModal] = useState(false)
  const [userContextValue, setUserContextValue] = useState<UserContextProps>({
    currentUser: null,
    onLogin: () => {
      // @todo open url
      console.log('onLogin')
      setUserContextValue((d) => ({
        ...d,
        currentUser: {
          id: 'a8w978w4',
          name: 'Ron Von Bauer',
          avatar: 'https://picsum.photos/512/512',
          token: 'w564a89w7489a44s.asdf78w8a4sfa.78a79w49a4s4',
        }
      }))
      userContextValue.closeModal()
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

  const onCloseCookie = () => {
    console.log('onCloseCookie')
  }

  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserContext.Provider value={userContextValue}>
        <div className="bg-gray-900 text-white flex min-h-screen md:overflow-hidden md:h-screen">
          {children}
        </div>
        <CookieBanner onClose={onCloseCookie} />
        <LoginModal
          opened={openedLoginModal}
          onLogin={userContextValue.onLogin}
          onClose={userContextValue.closeModal}
        />
      </UserContext.Provider>
    </div>
  )
}
