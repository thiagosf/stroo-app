import React from 'react'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Section: React.FC<Props> = function ({ children, className, ...props }) {
  const classes = ['py-5 md:py-8 lg:py-32']
  if (className) {
    classes.push(className)
  }
  return (
    <div className={classes.join(' ')} {...props}>
      {children}
    </div>
  )
}
