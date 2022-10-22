import React, { useContext, useState } from 'react'
import { SiteContext } from '../../../contexts/site_context'
import { StructureContext } from '../../../contexts/structure_context'

import { StructureActionButton } from '../../molecules/StructureActionButton/StructureActionButton'
import { Tooltip } from '../../molecules/Tooltip/Tooltip'
import { EmbedDialod } from '../EmbedDialog/EmbedDialog'

export const StructureActions: React.FC = function () {
  const structureValues = useContext(StructureContext)
  const siteValues = useContext(SiteContext)
  const icon = structureValues.expandAll ? 'expand' : 'collapse'
  const expandCollapseText = structureValues.expandAll ? 'Collapse' : 'Expand'
  const [embedActive, setEmbedActive] = useState(false)

  function toggleExpand() {
    setEmbedActive(() => false)
    structureValues.dispatch('currentPath', [])
    structureValues.dispatch('expandAll', !structureValues.expandAll)
  }

  function toggleEmbed() {
    setEmbedActive(() => !embedActive)
  }

  return (
    <div className="flex gap-2">
      <Tooltip text="Embed" position="bottom">
        <StructureActionButton
          icon="embed"
          active={embedActive}
          onClick={toggleEmbed}
        />
      </Tooltip>
      <Tooltip text={expandCollapseText} position="bottom">
        <StructureActionButton
          icon={icon}
          active={structureValues.expandAll}
          onClick={toggleExpand}
        />
      </Tooltip>
      {embedActive && (
        <div className="absolute top-0 right-20 bg-black bg-opacity-60 w-80 p-4 rounded-lg">
          <EmbedDialod structure={siteValues.structure} />
        </div>
      )}
    </div>
  )
}
