import React from 'react'

export interface Props {
  text: string;
  children?: React.ReactNode;
}

export const Tooltip: React.FC<Props> = function ({ text, children }) {
  return (
    <div className="flex group relative">
      <div className="flex">
        {children}
      </div>
      <div className="transition duration-200 opacity-0 absolute bottom-full left-2/4 transform -translate-x-2/4 bg-black bg-opacity-30 flex justify-center items-center text-center pointer-events-none group-hover:opacity-100 text-xs whitespace-nowrap px-2 py-1 rounded-sm text-white">
        {text}
      </div>
    </div>
  )
}
