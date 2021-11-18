import React from 'react'

export interface Props {
  children?: React.ReactNode;
}

export const StructureInfoName: React.FC<Props> = function ({ children }) {
  return (
    <div className="flex">
      {children}
    </div>
  )
}
