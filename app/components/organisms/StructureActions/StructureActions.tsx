import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'

import { SiteContext } from '../../../contexts/site_context'
import { StructureContext } from '../../../contexts/structure_context'

import { StructureActionButton } from '../../molecules/StructureActionButton/StructureActionButton'
import { StructureActionDialog } from '../../molecules/StructureActionDialog/StructureActionDialog'
import { Tooltip } from '../../molecules/Tooltip/Tooltip'

import { BashDialog } from '../BashDialog/BashDialog'
import { EmbedDialod } from '../EmbedDialog/EmbedDialog'

export const StructureActions: React.FC = function () {
  const router = useRouter()
  const isNew = router.pathname === '/'
  const structureValues = useContext(StructureContext)
  const siteValues = useContext(SiteContext)
  const icon = structureValues.expandAll ? 'expand' : 'collapse'
  const expandCollapseText = structureValues.expandAll ? 'Collapse' : 'Expand'
  const [embedActive, setEmbedActive] = useState(false)
  const [bashActive, setBashActive] = useState(false)

  function toggleExpand() {
    setEmbedActive(() => false)
    setBashActive(() => false)
    structureValues.dispatch('currentPath', [])
    structureValues.dispatch('expandAll', !structureValues.expandAll)
  }

  function toggleEmbed() {
    setBashActive(() => false)
    setEmbedActive(() => !embedActive)
  }

  function toggleBash() {
    setEmbedActive(() => false)
    setBashActive(() => !bashActive)
  }

  return (
    <div className="flex gap-2">
      {!isNew && (
        <div className="relative">
          <Tooltip text="Clone" position="bottom">
            <StructureActionButton
              icon="command"
              active={bashActive}
              onClick={toggleBash}
            />
          </Tooltip>
          {bashActive && (
            <BashDialog structure={siteValues.structure} />
          )}
        </div>
      )}
      {!isNew && (
        <div className="relative">
          <Tooltip text="Embed" position="bottom">
            <StructureActionButton
              icon="embed"
              active={embedActive}
              onClick={toggleEmbed}
            />
          </Tooltip>
          {embedActive && (
            <EmbedDialod structure={siteValues.structure} />
          )}
        </div>
      )}
      <Tooltip text={expandCollapseText} position="bottom">
        <StructureActionButton
          icon={icon}
          active={structureValues.expandAll}
          onClick={toggleExpand}
        />
      </Tooltip>
    </div>
  )
}
