import { useEffect, useState } from 'react'

import { useLocalStorage } from './use_local_storage'

export default function useCookieBanner() {
  const [cookieBanner, setCookieBanner] = useLocalStorage('cookie_banner', false)
  const [visible, setVisible] = useState(false)

  const onAccept = () => {
    setCookieBanner(true)
    setVisible(() => false)
  }

  useEffect(() => {
    if (!cookieBanner) setVisible(true)
  }, [])

  return { visible, onAccept }
}
