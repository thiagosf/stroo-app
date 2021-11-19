import React, { useState } from 'react'
import { FolderParseResult } from '../../../helpers/folder_utils'
import { Icon } from '../../atoms/Icon/Icon'

export interface Props {
  entity: FolderParseResult;
  children?: React.ReactNode;
  onClick: (item: FolderParseResult) => void;
}

export const StructureItem: React.FC<Props> = function ({ entity, onClick, children }) {
  const [opened, setOpened] = useState(false)
  const handleClick = () => {
    if (!opened) {
      onClick(entity)
    }
    setOpened((v) => !v)
  }
  const arrowClasses = children
    ? (opened ? 'rotate-90' : '')
    : 'opacity-0'
  const childrenClasses = opened ? '' : 'hidden'
  return (
    <div>
      <div className="flex items-center cursor-pointer rounded-full transition-colors duration-200 hover:bg-black hover:bg-opacity-40" onClick={handleClick}>
        <div className={`mx-2 transition-transform duration-200 transform ${arrowClasses}`}>
          <Icon name="arrow-right" svgClasses="w-6 h-6" />
        </div>
        <div className="mr-3">
          <Icon name={entity.icon} svgClasses="w-4 h-4" />
        </div>
        <span>{entity.name}</span>
      </div>
      {children && (
        <div className={`ml-3 ${childrenClasses}`}>
          {children}
        </div>
      )}
    </div>
  )
}
