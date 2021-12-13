import React from 'react'

export interface Props {
  url: string;
}

export const UserAvatar: React.FC<Props> = function ({ url }) {
  return (
    <div className="flex">
      {url && (
        <img
          src={url}
          className="w-12 h-12 rounded-full"
        />
      )}
      {!url && (
        <div
          className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl"
        >Y</div>
      )}
    </div>
  )
}
