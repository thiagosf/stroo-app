import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { UserContext } from '../../../contexts/user_context'
import { Logo } from '../../molecules/Logo/Logo'

export interface Props {
  children: React.ReactChild
}

export const Header: React.FC<Props> = function ({ children }) {
  const router = useRouter()
  const { openModal, currentUser } = useContext(UserContext)

  function goProfile() {
    router.push(`/@${currentUser.username}`)
  }

  return (
    <div className="flex flex-wrap flex-shrink gap-4 justify-between p-12 md:flex-nowrap">
      <div className="flex flex-grow">
        {children}
      </div>
      <div className="flex flex-shrink-0 gap-4 items-center">
        <div className="text-white cursor-pointer font-bold bg-white bg-opacity-5 rounded-full px-4 py-2 transition-colors duration-300 hover:bg-opacity-10">
          {currentUser && (
            <span onClick={goProfile}>@{currentUser.username}</span>
          )}
          {!currentUser && (
            <span onClick={openModal}>login</span>
          )}
        </div>
        <Logo />
      </div>
    </div>
  )
}
