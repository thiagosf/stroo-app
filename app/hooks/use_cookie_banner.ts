import { useEffect, useState } from 'react'

export default function useCookieBanner() {
  const [visible, setVisible] = useState(false)
  const key = 'cookie_banner'
  const onAccept = () => {
    localStorage.setItem(key, 'true')
    setVisible(() => false)
  }
  useEffect(() => {
    const value = localStorage.getItem(key)
    if (!value) {
      setVisible(true)
    }
  }, [])
  return { visible, onAccept }
}
