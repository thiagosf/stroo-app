import React from 'react'
import { StructureEntity } from '../../../pages/[username]/[slug]'
import { StructureKey } from '../../molecules/StructureKey/StructureKey'
import { StructureName } from '../../molecules/StructureName/StructureName'
import { StructureType } from '../../molecules/StructureType/StructureType'
import { UserAvatar } from '../../molecules/UserAvatar/UserAvatar'
import { UserName } from '../../molecules/UserName/UserName'

export interface Props {
  entity: StructureEntity;
}

export const StructureInfo: React.FC<Props> = function ({ entity }) {
  return (
    <div className="flex justify-center">
      <div className="flex-grow mr-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <UserAvatar url={entity.avatar} />
          </div>
          <div className="ml-4">
            <UserName name={entity.author} />
            <StructureName name={entity.name} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <StructureType type={entity.type} />
        <StructureKey code={entity.code} />
      </div>
    </div>
  )
}
