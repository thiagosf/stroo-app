import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { SiteContext } from '../../../contexts/site_context'
import { UserContext, UserEntity } from '../../../contexts/user_context'
import { getEmoji, randomEmoji } from '../../../helpers/emoji'
import { StructureEntity } from '../../../pages/[username]/[slug]'
import { DESTROY_ACCOUNT } from '../../../queries/user_queries'

import { ScrollSpy } from '../../molecules/ScrollSpy/ScrollSpy'
import { StructureListItem } from '../../molecules/StructureListItem/StructureListItem'
import { StructureName } from '../../molecules/StructureName/StructureName'
import { UserAvatar } from '../../molecules/UserAvatar/UserAvatar'
import { UserName } from '../../molecules/UserName/UserName'

import { EmptyStructures } from '../EmptyStructures/EmptyStructures'
import { Header } from '../MainHeader/Header'

export interface Props {
  user: UserEntity;
  structures: Array<StructureEntity>;
  structuresLoading: boolean;
  loadMoreStructures: () => Promise<void>;
}

export const Profile: React.FC<Props> = function ({ user, structures, structuresLoading, loadMoreStructures }) {
  const router = useRouter()
  const siteContextValue = useContext(SiteContext)
  const userContextValue = useContext(UserContext)
  const [destroyAccount] = useMutation(DESTROY_ACCOUNT)

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

  function handleDestroyAccount() {
    siteContextValue.setAlert({
      icon: getEmoji('warning'),
      title: 'All of your data will be delete right now! Are you sure?',
      delay: 1000 * 30,
      onConfirm: () => {
        destroyAccount({
          onCompleted(data) {
            userContextValue.onLogout()
            siteContextValue.cleanAlert()
            router.push('/')
          },
          onError(error) {
            siteContextValue.cleanAlert()
            siteContextValue.setAlert({
              icon: randomEmoji('unhappy'),
              title: error.message
            })
          }
        })
      },
      onCancel: () => siteContextValue.cleanAlert()
    })
  }

  return (
    <div className="flex flex-grow flex-col w-full h-full">
      <Header>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <UserAvatar url={user.avatar} />
          </div>
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <UserName user={user} />
              {userContextValue.currentUser?.username === user.username && (
                <>
                  <div className="text-sm border-b-2 cursor-pointer opacity-50" onClick={handleLogout}>
                    logout
                  </div>
                  <div className="text-sm border-b-2 border-red-500 cursor-pointer opacity-50 text-red-500" onClick={handleDestroyAccount}>
                    delete account
                  </div>
                </>
              )}
            </div>
            <StructureName name="Profile" />
          </div>
        </div>
      </Header>
      {!structuresLoading && items.length > 0 && (
        <ScrollSpy
          className="flex-grow h-full overflow-y-auto overflow-x-hidden"
          onReachedBottom={loadMoreStructures}
        >
          {items}
        </ScrollSpy>
      )}
      {!structuresLoading && items.length === 0 && (
        <div className="flex flex-grow h-full px-12 py-12 justify-center items-center lg:py-0">
          <EmptyStructures />
        </div>
      )}
    </div>
  )
}
