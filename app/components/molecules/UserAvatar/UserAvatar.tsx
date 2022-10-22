import React from 'react'

export interface Props {
  url: string;
  small?: boolean;
}

export const UserAvatar: React.FC<Props> = function ({ url, small }) {
  const size = small ? 'w-6 h-6' : 'w-12 h-12'
  return (
    <div className="flex">
      {url && (
        /* eslint-disable-next-line */
        <img
          src={url}
          className={`${size} object-cover rounded-full border-2 border-white shadow-md`}
        />
      )}
      {!url && (
        <div
          className={`${size} rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl`}
        >Y</div>
      )}
    </div>
  )
}
