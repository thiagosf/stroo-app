import React from 'react'
import { StructureKey } from '../../molecules/StructureKey/StructureKey'
import { StructureName } from '../../molecules/StructureName/StructureName'
import { StructureType } from '../../molecules/StructureType/StructureType'
import { UserAvatar } from '../../molecules/UserAvatar/UserAvatar'
import { UserName } from '../../molecules/UserName/UserName'

export interface Props {
}

export const StructureInfo: React.FC<Props> = function ({ }) {
  return (
    <div className="flex justify-center">
      <div className="flex-grow mr-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <UserAvatar url="https://picsum.photos/512/512" />
          </div>
          <div className="ml-4">
            <UserName name="Ron Von Bauer" />
            <StructureName name="react-boilerplate-v1" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <StructureType type="react" />
        <StructureKey code="5wasd8f7898a784w4a5sa4f56s4af4sd" />
      </div>
    </div>
  )
}
