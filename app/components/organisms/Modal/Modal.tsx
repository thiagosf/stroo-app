import React from 'react'

export interface Props {
  opened: boolean;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = function ({ opened, title, children }) {
  if (!opened) {
    return null
  }
  return (
    <div className="flex fixed top-0 left-0 right-0 bottom-0 z-20 bg-black bg-opacity-70 justify-center items-center p-10">
      <div className="overflow-y-auto max-h-full rounded-lg p-10 bg-gray-900 text-white w-full shadow-lg md:w-2/4 lg:w-2/6">
        <h2 className="text-2xl mb-4 text-green-500 md:text-4xl md:mb-6">{title}</h2>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
