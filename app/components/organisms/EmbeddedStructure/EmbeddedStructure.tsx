import React, { useState } from 'react'

import { StructureContext, StructureContextProps } from '../../../contexts/structure_context'
import { parse } from '../../../helpers/folder_utils'
import { StructureEntity } from '../../../pages/[username]/[slug]'

import { Structure } from '../Structure/Structure'

export interface Props {
  structure: StructureEntity;
}

export const EmbeddedStructure: React.FC<Props> = function ({ structure }) {
  const folderData = parse(structure.content)
  const [structureValues, setStructureValues] = useState<StructureContextProps>({
    currentPath: [],
    clickFrom: null,
    pathsTopPositions: [],
    expandAll: false,
    dispatch: (key: string, value: any) => {
      setStructureValues((v) => ({
        ...v,
        [key]: value
      }))
    },
  })

  return (
    <StructureContext.Provider value={structureValues}>
      <div className="text-white">
        <Structure data={folderData} />
      </div>
    </StructureContext.Provider>
  )
}
