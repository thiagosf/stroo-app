import React from 'react'

import { Icon } from '../../atoms/Icon/Icon'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: string;
}

export const Logo: React.FC<Props> = function ({ size, ...rest }) {
  const svgClasses = size === 'large'
    ? 'w-24 h-12'
    : 'w-12 h-6'
  return (
    <div {...rest}>
      <Icon name="logo" svgClasses={svgClasses} />
    </div>
  )
}
