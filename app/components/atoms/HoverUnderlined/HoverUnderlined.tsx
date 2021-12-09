import React from 'react'

export interface Props {
  children?: React.ReactNode;
}

export const HoverUnderlined: React.FC<Props> = function ({ children }) {
  return (
    <div className="hover:underline inline-flex">
      {children}
    </div>
  )
}
