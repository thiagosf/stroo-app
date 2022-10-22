import { useContext } from 'react'
import { SiteContext } from '../contexts/site_context'

export default function useTheme() {
  const siteContextValue = useContext(SiteContext)

  return [siteContextValue.theme, siteContextValue.setTheme]
}
