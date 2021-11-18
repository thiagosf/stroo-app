import React from 'react'

export interface Props {
  name: string;
}

export const UserName: React.FC<Props> = function ({ name }) {
  return (
    <div className="flex text-sm opacity-50 leading-5">
      {name}
    </div>
  )
}
