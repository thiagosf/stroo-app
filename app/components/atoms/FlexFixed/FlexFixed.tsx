import { useEffect } from 'react'

interface Props {
  children: React.ReactNode;
}

export const FlexFixed: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const overflowHidden = 'overflow-hidden'
    document.body.classList.add(overflowHidden)

    return () => {
      document.body.classList.remove(overflowHidden)
    }
  }, [])

  return (
    <div className="flex fixed top-0 left-0 right-0 bottom-0">
      {children}
    </div>
  )
}
