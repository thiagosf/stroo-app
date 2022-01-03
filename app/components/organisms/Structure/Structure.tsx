import React from 'react'
import { FolderParseResult } from '../../../helpers/folder_utils'
import { StructureItem } from '../StructureItem/StructureItem'

export interface Props {
  data: { [key: string]: FolderParseResult };
}

export const Structure: React.FC<Props> = React.memo(({ data }) => {
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
        children={children}
      />
    )
  }

  const items = Object.keys(data).map((key) => {
    return buildChildren(data[key])
  })

  return (
    <div className="flex flex-col bg-gradient-to-tl from-gray-900 to-gray-800 rounded-2xl p-10 text-2xl overflow-x-auto shadow-2xl lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:bottom-0">
      {items}
    </div>
  )
})
