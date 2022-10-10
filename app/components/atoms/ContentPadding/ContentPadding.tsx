import React from 'react'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ContentPadding: React.FC<Props> = function ({ className, children, ...props }) {
  const classes = `p-6 md:p-10 lg:p-12 ${className ? className : ''}`
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
