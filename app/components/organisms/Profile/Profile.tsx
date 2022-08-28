import React from 'react'
import { AuthorEntity } from '../../../pages/[username]'
import { Logo } from '../../molecules/Logo/Logo'
import { StructureListItem } from '../../molecules/StructureListItem/StructureListItem'
import { StructureName } from '../../molecules/StructureName/StructureName'
import { UserAvatar } from '../../molecules/UserAvatar/UserAvatar'
import { UserName } from '../../molecules/UserName/UserName'

export interface Props {
  username: AuthorEntity;
}

export const Profile: React.FC<Props> = function ({ username }) {
  const items = username.list.map((item) => {
    return (
      <StructureListItem
        key={item.code}
        entity={item}
      />
    )
  })

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-shrink justify-between p-12 bg-gray-900">
        <div className="flex flex-grow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserAvatar url={username.avatar} />
            </div>
            <div className="ml-4">
              <UserName name={username.username} />
              <StructureName name="Structures" />
            </div>
          </div>
        </div>
        <div className="flex flex-shrink-0">
          <Logo />
        </div>
      </div>
      <div className="flex-grow h-full overflow-y-auto overflow-x-hidden">
        {items}
      </div>
    </div>
  )
}
