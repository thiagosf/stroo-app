import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { UserContext } from '../../../contexts/user_context'
import { truncate } from '../../../helpers/string_utils'
import { Button } from '../../molecules/Button/Button'
import { Logo } from '../../molecules/Logo/Logo'

export interface Props {
  children: React.ReactChild
}

export const Header: React.FC<Props> = function ({ children }) {
  const router = useRouter()
  const { openModal, currentUser } = useContext(UserContext)
  const isNewPathname = router.pathname === '/'
  const isBrowsePathname = router.pathname === '/browse'
  const mainButtonText = currentUser
    ? truncateUsername(currentUser.username)
    : 'login'

  function goProfile() {
    router.push(`/@${currentUser.username}`)
  }

  function handleMainButtonClick() {
    if (currentUser) goProfile()
    else openModal()
  }

  function truncateUsername(username: string): string {
    return truncate(`@${username}`, 10)
  }

  return (
    <div className="font-mono flex flex-wrap flex-shrink gap-4 justify-between p-12 md:flex-nowrap">
      <div className="flex flex-grow">
        {children}
      </div>
      <div className="flex flex-col flex-shrink-0 gap-4 items-start md:flex-row md:items-center lg:flex-col lg:items-start 2xl:flex-row 2xl:items-center">
        <div className="flex gap-4 items-center">
          {!isBrowsePathname && (
            <Link href="/browse">
              <a>
                <Button bordered size="small">BROWSE</Button>
              </a>
            </Link>
          )}
          {currentUser && !isNewPathname && (
            <Link href="/">
              <a>
                <Button filled size="small">NEW</Button>
              </a>
            </Link>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <Button filled color="white-opacity" onClick={handleMainButtonClick}>
            {mainButtonText}
          </Button>
          <Logo />
        </div>
      </div>
    </div>
  )
}
