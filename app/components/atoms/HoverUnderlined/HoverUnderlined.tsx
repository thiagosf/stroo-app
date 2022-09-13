import React from 'react'

export interface Props {
  color?: string;
  children?: React.ReactNode;
}

export const HoverUnderlined: React.FC<Props> = function ({ color, children }) {
  const borderColor = color ? `border-${color}` : 'border-white'
  return (
    <div className={`transition-colors duration-200 border-b-2 border-transparent hover:${borderColor} inline-flex cursor-pointer`}>
      {children}
    </div>
  )
}
