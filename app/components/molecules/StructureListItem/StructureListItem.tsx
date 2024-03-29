import React, { useContext } from 'react'
import Link from 'next/link'

import { StructureEntity } from '../../../pages/[username]/[slug]'

import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserName } from '../UserName/UserName'
import { SiteContext } from '../../../contexts/site_context'

export interface Props {
  entity: StructureEntity;
  showAuthor?: boolean;
  full?: boolean;
}

export const StructureListItem: React.FC<Props> = function ({ entity, showAuthor, full }) {
  const siteContextValue = useContext(SiteContext)
  const customClasses = full ? '' : 'md:pl-6'

  function handleClick() {
    siteContextValue.setFullLoading(true)
  }

  return (
    <Link href={entity.link}>
      <a className="group font-mono" onClick={handleClick}>
        <div className={`flex flex-col p-6 transition transform-gpu group group-hover:bg-purple-900 hover:translate-x-1 md:px-24 md:py-6 ${customClasses}`}>
          {showAuthor && (
            <div className="flex gap-2 items-center transition text-white group-hover:text-white">
              <UserAvatar url={entity.user.avatar} small />
              <UserName user={entity.user} />
            </div>
          )}
          <div className="flex text-4xl mb-2 md:text-4xl 2xl:text-6xl">
            {entity.name}
          </div>
          <div className="flex items-center">
            <div className="flex text-lg mr-4 leading-none">
              {entity.type}
            </div>
            <div className="flex text-sm leading-none opacity-50">
              {entity.code}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
