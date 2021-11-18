import React from 'react'

export interface Props {
  url: string;
}

export const UserAvatar: React.FC<Props> = function ({ url }) {
  return (
    <div className="flex">
      <img
        src={url}
        className="w-12 h-12 rounded-full"
      />
    </div>
  )
}
