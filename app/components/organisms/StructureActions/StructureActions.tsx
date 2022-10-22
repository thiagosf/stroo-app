import React, { useContext } from 'react'
import { StructureContext } from '../../../contexts/structure_context'

import { StructureActionButton } from '../../molecules/StructureActionButton/StructureActionButton'
import { Tooltip } from '../../molecules/Tooltip/Tooltip'

export const StructureActions: React.FC = function () {
  const structureValues = useContext(StructureContext)
  const icon = structureValues.expandAll ? 'expand' : 'collapse'
  const expandCollapseText = structureValues.expandAll ? 'Collapse' : 'Expand'

  function toggleExpand() {
    structureValues.dispatch('currentPath', [])
    structureValues.dispatch('expandAll', !structureValues.expandAll)
  }

  function handleEmbed() {
    // @todo open modal to copy embed code
  }

  return (
    <div className="flex gap-2">
      <Tooltip text="Embed">
        <StructureActionButton
          icon="embed"
          onClick={handleEmbed}
        />
      </Tooltip>
      <Tooltip text={expandCollapseText}>
        <StructureActionButton
          icon={icon}
          active={structureValues.expandAll}
          onClick={toggleExpand}
        />
      </Tooltip>
    </div>
  )
}
