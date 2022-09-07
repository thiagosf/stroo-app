import React, { useContext } from 'react'

import { UserContext, UserEntity } from '../../../contexts/user_context'
import { StructureEntity } from '../../../pages/[username]/[slug]'

import { StructureListItem } from '../../molecules/StructureListItem/StructureListItem'
import { StructureName } from '../../molecules/StructureName/StructureName'
import { UserAvatar } from '../../molecules/UserAvatar/UserAvatar'
import { UserName } from '../../molecules/UserName/UserName'

import { Header } from '../Header/Header'

export interface Props {
  user: UserEntity;
  structures: Array<StructureEntity>;
}

export const Profile: React.FC<Props> = function ({ user, structures }) {
  const userContextValue = useContext(UserContext)

  const items = structures.map(item => {
    return (
      <StructureListItem
        key={item.code}
        entity={item}
      />
    )
  })

  function handleLogout() {
    userContextValue.onLogout()
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Header>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <UserAvatar url={user.avatar} />
          </div>
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <UserName user={user} />
              {userContextValue.currentUser?.username === user.username && (
                <div className="text-sm border-b-2 cursor-pointer opacity-50" onClick={handleLogout}>
                  logout
                </div>
              )}
            </div>
            <StructureName name="Structures" />
          </div>
        </div>
      </Header>
      <div className="flex-grow h-full overflow-y-auto overflow-x-hidden">
        {items}
      </div>
    </div>
  )
}
