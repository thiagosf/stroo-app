import React from 'react'

export interface Props {
  children?: React.ReactNode;
}

export const TextContent: React.FC<Props> = function ({ children }) {
  return (
    <div className="text-content">
      {children}
    </div>
  )
}
