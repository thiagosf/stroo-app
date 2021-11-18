import React from 'react'
export interface Props {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<Props> = function ({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {children}
    </div>
  )
}
