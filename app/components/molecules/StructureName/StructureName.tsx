import React from 'react'

export interface Props {
  name: string;
}

export const StructureName: React.FC<Props> = function ({ name }) {
  return (
    <div className="flex text-base leading-5 font-bold">
      {name}
    </div>
  )
}
