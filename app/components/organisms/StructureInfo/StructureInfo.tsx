import React from 'react'
import { StructureEntity } from '../../../pages/[username]/[slug]'
import { Icon } from '../../atoms/Icon/Icon'
import { Counter } from '../../molecules/Counter/Counter'
import { StructureKey } from '../../molecules/StructureKey/StructureKey'
import { StructureName } from '../../molecules/StructureName/StructureName'
import { StructureType } from '../../molecules/StructureType/StructureType'
import { Tooltip } from '../../molecules/Tooltip/Tooltip'
import { UserAvatar } from '../../molecules/UserAvatar/UserAvatar'
import { UserName } from '../../molecules/UserName/UserName'

export interface Props {
  entity: StructureEntity;
  onFavorite?: (entity: StructureEntity) => void;
  onComplain?: (entity: StructureEntity) => void;
}

export const StructureInfo: React.FC<Props> = function ({ entity, onFavorite, onComplain }) {
  const disabledActions = onFavorite == undefined
  const actionsClasses = disabledActions
    ? 'opacity-30 pointer-events-none'
    : ''

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(entity)
    }
  }

  const handleComplain = () => {
    if (onComplain) {
      onComplain(entity)
    }
  }

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
      <div className="flex flex-col items-end justify-center mr-4">
        <StructureType type={entity.type} />
        <StructureKey code={entity.code} />
      </div>
      <div className={`flex justify-center items-start ${actionsClasses}`}>
        <div className="mr-2 cursor-pointer" onClick={handleFavorite}>
          <Tooltip text="Good!">
            <Counter count={365874}>
              <Icon name="heart-filled" svgClasses="w-6 h-6" />
            </Counter>
          </Tooltip>
        </div>
        <div className="cursor-pointer" onClick={handleComplain}>
          <Tooltip text="Complain">
            <Icon name="complaint" svgClasses="w-6 h-6" />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
