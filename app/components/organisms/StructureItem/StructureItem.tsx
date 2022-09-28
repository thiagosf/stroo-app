import React, { useContext, useEffect, useState } from 'react'
import { StructureContext } from '../../../contexts/structure_context'
import { FolderParseResult, FOLDER_SEPARATOR } from '../../../helpers/folder_utils'
import { Icon } from '../../atoms/Icon/Icon'

export interface Props {
  entity: FolderParseResult;
  children?: React.ReactNode;
}

export const StructureItem: React.FC<Props> = function ({ entity, children }) {
  const structureValues = useContext(StructureContext)
  const [opened, setOpened] = useState(false)
  const [isCurrent, setIsCurrent] = useState(false)

  const handleClick = () => {
    structureValues.dispatch('currentPath', entity.path)
    structureValues.dispatch('clickFrom', 'item')
    setOpened((v) => !v)
  }

  const arrowClasses = children
    ? (opened ? 'rotate-90' : '')
    : 'opacity-0'
  const childrenClasses = opened ? '' : 'hidden'
  const currentClasses = isCurrent ? 'bg-purple-500 bg-opacity-20' : 'hover:bg-black hover:bg-opacity-40'

  useEffect(() => {
    if (structureValues.currentPath.length > 0) {
      const entityPath = entity.path.join(FOLDER_SEPARATOR)
      const currentPath = structureValues.currentPath.join(FOLDER_SEPARATOR)
      if (structureValues.clickFrom === 'title') {
        setOpened(false)
        setIsCurrent(false)
        if (entityPath === currentPath) {
          setIsCurrent(true)
        }
        for (const index in structureValues.currentPath) {
          const comparePath = structureValues.currentPath.slice(0, +index + 1)
          if (
            entityPath === comparePath.join(FOLDER_SEPARATOR)
          ) {
            setOpened(true)
          }
        }
      } else if (structureValues.clickFrom === 'item') {
        if (entityPath === currentPath) {
          setIsCurrent(true)
        } else {
          setIsCurrent(false)
        }
      }
    }
  }, [structureValues])

  return (
    <div className="relative">
      <span className="border-l border-white border-opacity-10 absolute top-9 left-5 bottom-1 z-0"></span>
      <div className="relative z-10">
        <div className={`flex items-center cursor-pointer rounded-lg transition-colors duration-200 ${currentClasses}`} onClick={handleClick}>
          <div className={`mx-2 transition-transform duration-200 transform ${arrowClasses}`}>
            <Icon name="arrow-right" svgClasses="w-6 h-6" />
          </div>
          <div className="mr-3">
            <Icon name={entity.icon} svgClasses="w-4 h-4" />
          </div>
          <span className="break-all lg:whitespace-nowrap lg:break-normal">{entity.name}</span>
        </div>
        {children && (
          <div className={`ml-3 ${childrenClasses}`}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
