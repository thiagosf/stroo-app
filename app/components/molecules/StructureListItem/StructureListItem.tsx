import React from 'react'
import Link from 'next/link'
import { StructureEntity } from '../../../pages/[username]/[slug]'

export interface Props {
  entity: StructureEntity;
}

export const StructureListItem: React.FC<Props> = function ({ entity }) {
  return (
    <Link href={entity.link}>
      <a className="flex flex-col px-24 py-6 transition transform-gpu hover:bg-purple-900 hover:translate-x-1">
        <div className="flex text-6xl mb-2">
          {entity.name}
        </div>
        <div className="flex items-center">
          <div className="flex text-lg mr-4 leading-none">
            {entity.type}
          </div>
          <div className="flex text-sm leading-none opacity-50">
            {entity.code}
          </div>
        </div>
      </a>
    </Link>
  )
}
