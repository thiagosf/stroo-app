import React from 'react'

import validIcons from './valid_icons'

export interface Props {
  name: string;
  svgClasses?: string;
}

export const Icon: React.FC<Props> = function ({ name, svgClasses }) {
  let validName = name
  if (!validIcons.includes(name)) validName = 'folder-generic'
  const Svg = require(`../../../public/svgs/${validName}.svg`)
  return (
    <Svg className={`fill-current ${svgClasses}`} />
  )
}
