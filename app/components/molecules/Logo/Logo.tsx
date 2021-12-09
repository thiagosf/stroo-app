import React from 'react'
import Link from 'next/link'
import { Icon } from '../../atoms/Icon/Icon'

export interface Props {
  size?: string;
}

export const Logo: React.FC<Props> = function ({ size }) {
  const svgClasses = size === 'large'
    ? 'w-24 h-12'
    : 'w-12 h-6'
  return (
    <Link href="/">
      <a className="flex">
        <Icon name="logo" svgClasses={svgClasses} />
      </a>
    </Link>
  )
}
