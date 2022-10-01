import React, { useContext } from 'react'
import { StructureContext } from '../../../contexts/structure_context'

import { StructureActionButton } from '../../molecules/StructureActionButton/StructureActionButton'

export const StructureActions: React.FC = function () {
  const structureValues = useContext(StructureContext)
  const icon = structureValues.expandAll ? 'expand' : 'collapse'

  function toggleExpand() {
    structureValues.dispatch('currentPath', [])
    structureValues.dispatch('expandAll', !structureValues.expandAll)
  }

  return (
    <div className="flex gap-3">
      <StructureActionButton
        icon={icon}
        active={structureValues.expandAll}
        onClick={toggleExpand}
      />
    </div>
  )
}
