import React from 'react'

import { Spinner } from '../../atoms/Spinner/Spinner'

export interface Props {
  actived: boolean;
  children: React.ReactNode;
}

export const Spinned: React.FC<Props> = function ({ actived, children }) {
  const classes = actived ? 'pointer-events-none' : ''
  const childrenClasses = actived ? 'opacity-10' : ''

  return (
    <div className={`relative ${classes}`}>
      {actived && (
        <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
          <Spinner size="small" />
        </div>
      )}
      <div className={childrenClasses}>
        {children}
      </div>
    </div>
  )
}
