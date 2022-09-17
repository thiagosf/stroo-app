import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Head from 'next/head'

import { UserContext } from '../../../contexts/user_context'
import configUtils from '../../../helpers/config_utils'
import { useLocalStorage } from '../../../hooks/use_local_storage'
import { PRIVATE_PROFILE } from '../../../queries/user_queries'

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
  const [token, setToken] = useLocalStorage('token', null)
  const { data: profileData, loading } = useQuery(PRIVATE_PROFILE, {
    skip: token === null
  })
  const userContextValue = useContext(UserContext)

  const title = seo?.title
    ? `${seo.title} / ${configUtils.siteName}`
    : configUtils.siteName
  const description = seo?.description
    ? seo.description
    : 'Lorem ipsum'

  useEffect(() => {
    if (loading) return
    if (profileData) {
      userContextValue.setCurrentUser({
        name: profileData.me.name,
        username: profileData.me.username,
        avatar: profileData.me.avatar,
        token,
      })
    } else {
      setToken(null)
    }
  }, [loading, profileData])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white flex min-h-screen lg:overflow-hidden lg:h-screen">
        {children}
      </div>
    </div>
  )
}
