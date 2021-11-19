import React from 'react'
export interface Props {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<Props> = function ({ children }) {
  return (
    <div className="flex min-h-screen md:overflow-hidden md:h-screen">
      {children}
    </div>
  )
}
