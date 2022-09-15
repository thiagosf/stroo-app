import Link from 'next/link'
import React from 'react'
import { isEnabledFeature } from '../../../helpers/config_utils'
import { getUserProfileLink } from '../../../helpers/user_utils'
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
  const isEnalbedComplain = isEnabledFeature('complain')
  const disabledActions = onFavorite == undefined
  const actionsClasses = disabledActions
    ? 'opacity-30 pointer-events-none'
    : ''
  const userProfileLink = getUserProfileLink(entity.user)
  const heartIcon = entity.liked ? 'heart-filled' : 'heart'

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
            <Link href={userProfileLink}>
              <a>
                <UserAvatar url={entity.user.avatar} />
              </a>
            </Link>
          </div>
          <div className="ml-4">
            <Link href={userProfileLink}>
              <a className="transition-opacity duration-200 opacity-50 hover:opacity-100">
                <UserName user={entity.user} />
              </a>
            </Link>
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
            <Counter count={entity.like_count}>
              <Icon name={heartIcon} svgClasses="w-6 h-6" />
            </Counter>
          </Tooltip>
        </div>
        {isEnalbedComplain && (
          <div className="cursor-pointer" onClick={handleComplain}>
            <Tooltip text="Complain">
              <Icon name="complaint" svgClasses="w-6 h-6" />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  )
}
