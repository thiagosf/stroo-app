import React, { useContext } from 'react'
import { SiteContext } from '../../../contexts/site_context';

export interface Props {
  children?: React.ReactNode;
}

export const EmbedLayout: React.FC<Props> = function ({ children }) {
  const siteContextValue = useContext(SiteContext)
  const classes = siteContextValue.theme === 'dark'
    ? 'text-white'
    : ''

  return (
    <div className={classes}>
      {children}
    </div>
  )
}
