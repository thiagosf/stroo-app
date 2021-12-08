import React from 'react'
import Head from 'next/head'
import configUtils from '../../../helpers/config_utils'
import { CookieBanner } from '../../organisms/CookieBanner/CookieBanner'

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
      <div className="flex min-h-screen md:overflow-hidden md:h-screen">
        {children}
      </div>
      <CookieBanner onClose={onCloseCookie} />
    </div>
  )
}
