import React, { useState } from 'react'

import { StructureContext, StructureContextProps } from '../../../contexts/structure_context'
import configUtils from '../../../helpers/config_utils'
import { parse } from '../../../helpers/folder_utils'
import { StructureEntity } from '../../../pages/[username]/[slug]'
import { Link } from '../../atoms/Link/Link'
import { Logo } from '../../molecules/Logo/Logo'

import { Structure } from '../Structure/Structure'
import { StructureInfo } from '../StructureInfo/StructureInfo'

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

  async function onFavorite() { }

  async function onComplain() { }

  return (
    <StructureContext.Provider value={structureValues}>
      <div className="fixed top-0 left-0 right-0 bottom-0">
        <div className="flex flex-col h-full gap-2">
          <div className="flex items-center gap-6 shrink-0">
            <div className="grow">
              <StructureInfo
                hideActions
                entity={structure}
                onFavorite={onFavorite}
                onComplain={onComplain}
              />
            </div>
            <div className="flex flex-col items-end">
              <small className="text-[8px]">powered by</small>
              <Link href={configUtils.siteURL}>
                <Logo />
              </Link>
            </div>
          </div>
          <div className="flex grow overflow-auto text-white">
            <Structure data={folderData} />
          </div>
        </div>
      </div>
    </StructureContext.Provider>
  )
}
