import { useEffect } from 'react'

interface Props {
  children: React.ReactNode;
}

export const FlexFixed: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const overflowHidden = 'lg:overflow-hidden'
    document.body.classList.add(overflowHidden)

    return () => {
      document.body.classList.remove(overflowHidden)
    }
  }, [])

  return (
    <div className="lg:flex lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:bottom-0">
      {children}
    </div>
  )
}
