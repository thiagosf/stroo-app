import React from 'react'

export interface Props {
  name: string;
  svgClasses?: string;
}

export const Icon: React.FC<Props> = function ({ name, svgClasses }) {
  const Svg = require(`../../../public/svgs/${name}.svg`)
  return (
    <Svg className={`fill-current ${svgClasses}`} />
  )
}
