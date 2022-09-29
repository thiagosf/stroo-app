import { useEffect } from 'react'

interface Props {
  children: React.ReactNode;
}

export const FlexFixed: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const overflowHidden = 'md:overflow-hidden'
    document.body.classList.add(overflowHidden)

    return () => {
      document.body.classList.remove(overflowHidden)
    }
  }, [])

  return (
    <div className="flex md:fixed md:top-0 md:left-0 md:right-0 md:bottom-0">
      {children}
    </div>
  )
}
