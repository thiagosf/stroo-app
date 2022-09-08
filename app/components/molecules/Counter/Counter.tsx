import React from 'react'

export interface Props {
  count: number;
  children?: React.ReactNode;
}

export const Counter: React.FC<Props> = function ({ count, children }) {
  const formattedCounter = formatCounter()

  function formatCounter() {
    return new Intl.NumberFormat().format(count).toString().replace(/,/g, '.')
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex">
        {children}
      </div>
      <div className="flex text-xs mt-1 font-bold">
        {formattedCounter}
      </div>
    </div>
  )
}
