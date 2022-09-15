import React from 'react'

import { UserEntity } from '../../../contexts/user_context'

export interface Props {
  user: UserEntity;
}

export const UserName: React.FC<Props> = function ({ user }) {
  return (
    <div className="flex text-sm leading-5 transition-opacity duration-200 opacity-50 hover:opacity-100">
      @{user.username}
    </div>
  )
}
