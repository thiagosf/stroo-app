import React from 'react'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Wrapper: React.FC<Props> = function ({ children, ...props }) {
  return (
    <div className="max-w-screen-2xl m-auto px-5 md:px-8 lg:px-16" {...props}>
      {children}
    </div>
  )
}
