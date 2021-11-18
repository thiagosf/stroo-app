import React from 'react'

export interface Props {
  code: string;
}

export const StructureKey: React.FC<Props> = function ({ code }) {
  return (
    <div className="flex text-xs opacity-50">
      {code}
    </div>
  )
}
