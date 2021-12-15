import React from 'react'
import Link from 'next/link'
import { StructureEntity } from '../../../pages/[username]/[slug]'

export interface Props {
  entity: StructureEntity;
  showAuthor?: boolean;
}

export const StructureListItem: React.FC<Props> = function ({ entity, showAuthor }) {
  return (
    <Link href={entity.link}>
      <a className="group">
        <div className="flex flex-col px-12 py-4 transition transform-gpu group md:px-24 md:py-6 group-hover:bg-purple-900 hover:translate-x-1">
          {showAuthor && (
            <div className="flex transition text-green-500 group-hover:text-white">
              by {entity.author}
            </div>
          )}
          <div className="flex text-4xl mb-2 md:text-6xl">
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
        </div>
      </a>
    </Link>
  )
}
