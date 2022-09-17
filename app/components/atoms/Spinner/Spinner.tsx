import React from 'react'

export type SpinnerSize = 'small'

export interface Props {
  size?: SpinnerSize;
}

export const Spinner: React.FC<Props> = function ({ size }) {
  const boxSize = size === 'small' ? '4' : '10'
  const borderSize = size === 'small' ? '2' : '4'
  const circleSize = size === 'small' ? '2' : '6'

  return (
    <div className={`inline-flex w-${boxSize} h-${boxSize} justify-center items-center relative`}>
      <div className={`border-${borderSize} border-transparent border-t-white rounded-full animate-spin-fast absolute top-0 left-0 bottom-0 right-0`}></div>
      <div className={`w-${circleSize} h-${circleSize} bg-green-500 rounded-full`}></div>
    </div>
  )
}
