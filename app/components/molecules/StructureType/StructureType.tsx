import React from 'react'

export interface Props {
  type: string;
}

export const StructureType: React.FC<Props> = function ({ type }) {
  return (
    <div className="flex">
      {type}
    </div>
  )
}
