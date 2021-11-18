import React from 'react'
import { Icon } from '../../atoms/Icon/Icon'

export interface Props {
  name: string;
}

export const StructureItem: React.FC<Props> = function ({ name }) {
  return (
    <div className="flex items-center cursor-pointer rounded-full hover:bg-black hover:bg-opacity-40">
      <div className="mx-2">
        <Icon name="arrow-right" svgClasses="w-6 h-6" />
      </div>
      <div className="mr-3">
        <Icon name="folder-generic" svgClasses="w-4 h-4" />
      </div>
      <span>{name}</span>
    </div>
  )
}
