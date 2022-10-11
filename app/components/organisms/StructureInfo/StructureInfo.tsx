import React, { useState } from 'react'
import Link from 'next/link'

import { isEnabledFeature } from '../../../helpers/config_utils'
import { getUserProfileLink } from '../../../helpers/user_utils'
import { StructureEntity } from '../../../pages/[username]/[slug]'
import { Icon } from '../../atoms/Icon/Icon'
import { Counter } from '../../molecules/Counter/Counter'
import { Spinned } from '../../molecules/Spinned/Spinned'
import { StructureKey } from '../../molecules/StructureKey/StructureKey'
import { StructureName } from '../../molecules/StructureName/StructureName'
import { StructureType } from '../../molecules/StructureType/StructureType'
import { Tooltip } from '../../molecules/Tooltip/Tooltip'
import { UserAvatar } from '../../molecules/UserAvatar/UserAvatar'
import { UserName } from '../../molecules/UserName/UserName'
import { getTwitterShareURLForStructure } from '../../../helpers/share_utils'

export interface Props {
  entity: StructureEntity;
  onFavorite?: (entity: StructureEntity) => Promise<void>;
  onComplain?: (entity: StructureEntity) => Promise<void>;
}

export const StructureInfo: React.FC<Props> = function ({ entity, onFavorite, onComplain }) {
  const isEnalbedComplain = isEnabledFeature('complain')
  const disabledActions = onFavorite == undefined
  const actionsClasses = disabledActions
    ? 'opacity-30 pointer-events-none'
    : ''
  const userProfileLink = getUserProfileLink(entity.user)
  const heartIcon = entity.liked ? 'heart-filled' : 'heart'
  const [isSendingLike, setIsSendingLike] = useState(false)
  const twitterUrl = getTwitterShareURLForStructure(entity)

  async function handleFavorite() {
    if (onFavorite) {
      try {
        setIsSendingLike(() => true)
        await onFavorite(entity)
      } finally {
        setIsSendingLike(() => false)
      }
    }
  }

  async function handleComplain() {
    if (onComplain) {
      try {
        await onComplain(entity)
      } finally { }
    }
  }

  return (
    <div className="flex justify-center font-mono">
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
              <a>
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
      <div className={`flex gap-2 justify-center items-start ${actionsClasses}`}>
        <Spinned actived={isSendingLike}>
          <div className="cursor-pointer" onClick={handleFavorite}>
            <Tooltip text="Good!">
              <Counter count={entity.like_count}>
                <Icon name={heartIcon} svgClasses="w-6 h-6" />
              </Counter>
            </Tooltip>
          </div>
        </Spinned>
        {isEnalbedComplain && (
          <div className="cursor-pointer" onClick={handleComplain}>
            <Tooltip text="Complain">
              <Icon name="complaint" svgClasses="w-6 h-6" />
            </Tooltip>
          </div>
        )}
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          <Tooltip text="Share on Twitter!">
            <Icon name="twitter" svgClasses="w-6 h-6" />
          </Tooltip>
        </a>
      </div>
    </div>
  )
}
