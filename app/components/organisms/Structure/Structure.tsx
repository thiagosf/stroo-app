import React from 'react'

import { FolderParseResult } from '../../../helpers/folder_utils'

import { StructureActions } from '../StructureActions/StructureActions'
import { StructureItem } from '../StructureItem/StructureItem'

export interface Props {
  data: { [key: string]: FolderParseResult };
}

export const Structure: React.FC<Props> = React.memo(function Structure({ data }) {
  const buildChildren = (item: FolderParseResult) => {
    let children: any
    if (Object.keys(item.children).length > 0) {
      children = Object.keys(item.children).map((child) => {
        return buildChildren(item.children[child])
      })
    }
    return (
      <StructureItem
        key={`${item.path.join('_')}`}
        entity={item}
      >{children}</StructureItem>
    )
  }

  const items = Object.keys(data).map((key) => {
    return buildChildren(data[key])
  })

  return (
    <div className="font-mono relative flex flex-1 flex-col bg-gradient-to-tl from-gray-900 to-gray-800 rounded-2xl p-6 pt-12 text-2xl overflow-x-auto shadow-2xl select-none md:p-8 md:pt-12 lg:p-10 lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:bottom-0">
      <div className="absolute top-3 right-3">
        <StructureActions />
      </div>
      <div>
        {items}
      </div>
    </div>
  )
})
