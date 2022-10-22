import React from 'react'

export type TooltipPosition = 'top' | 'bottom'

export interface Props {
  text: string;
  position?: TooltipPosition;
  children?: React.ReactNode;
}

export const Tooltip: React.FC<Props> = function ({ text, position = 'top', children }) {
  const classes = position === 'top'
    ? 'bottom-full'
    : 'top-full'

  return (
    <div className="flex group relative">
      <div className="flex">
        {children}
      </div>
      <div className={`transition duration-200 opacity-0 absolute left-2/4 transform -translate-x-2/4 scale-75 bg-black bg-opacity-30 flex justify-center items-center text-center pointer-events-none text-xs whitespace-nowrap px-2 py-1 rounded-sm text-white group-hover:opacity-100 group-hover:scale-100 ${classes}`}>
        {text}
      </div>
    </div>
  )
}
