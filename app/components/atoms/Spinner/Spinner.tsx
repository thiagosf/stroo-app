import React from 'react'

export const Spinner: React.FC = function () {
  return (
    <div className="inline-flex w-10 h-10 justify-center items-center relative">
      <div className="border-4 border-transparent border-t-white rounded-full animate-spin-fast absolute top-0 left-0 bottom-0 right-0"></div>
      <div className="w-6 h-6 border-4 border-green-500 rounded-full"></div>
    </div>
  )
}
