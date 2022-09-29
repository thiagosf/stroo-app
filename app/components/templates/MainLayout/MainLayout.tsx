import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Head from 'next/head'

import { UserContext } from '../../../contexts/user_context'
import configUtils from '../../../helpers/config_utils'
import { useLocalStorage } from '../../../hooks/use_local_storage'
import { PRIVATE_PROFILE } from '../../../queries/user_queries'

export interface SeoMetaCustom {
  label: string;
  value: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  custom?: Array<SeoMetaCustom>
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
    : configUtils.siteDescription
  const image = seo?.image
    ? seo.image
    : `${configUtils.siteURL}/images/seo-image.png`
  const url = seo?.url ? seo.url : null

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

        {url && (
          <meta property="og:url" content={url} />
        )}
        {image && (
          <>
            <meta property="twitter:image:src" content={image} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="600" />
          </>
        )}
        <meta property="og:site_name" content={configUtils.siteName} />
        <meta property="og:type" content="object" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@strooapp" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {seo?.custom?.map((item, index) => (
          <React.Fragment key={index}>
            <meta name={`twitter:label${index + 1}`} content={item.label} />
            <meta name={`twitter:data${index + 1}`} content={item.value} />
          </React.Fragment>
        ))}

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white min-h-screen lg:flex lg:overflow-hidden lg:h-screen">
        {children}
      </div>
    </div>
  )
}
