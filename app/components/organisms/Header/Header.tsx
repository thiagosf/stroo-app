import React from 'react'
import { Logo } from '../../molecules/Logo/Logo'
import { TextContent } from '../TextContent/TextContent'

export interface Props {
  children: React.ReactChild
}

export const Header: React.FC<Props> = function ({ children }) {
  return (
    <div className="flex flex-shrink justify-between p-12">
      <div className="flex flex-grow">
        {children}
      </div>
      <div className="flex flex-shrink-0">
        <Logo />
      </div>
    </div>
  )
}
