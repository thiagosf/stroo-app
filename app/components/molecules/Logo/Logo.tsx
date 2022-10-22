import React from 'react'
import useTheme from '../../../hooks/use_theme';

import { Icon } from '../../atoms/Icon/Icon'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: string;
}

export const Logo: React.FC<Props> = function ({ size, ...rest }) {
  const [theme] = useTheme()
  const svgClasses = size === 'large'
    ? 'w-24 h-12'
    : 'w-12 h-6'
  const name = theme === 'dark' ? 'logo' : 'logo-light'
  return (
    <div {...rest}>
      <Icon name={name} svgClasses={svgClasses} />
    </div>
  )
}
