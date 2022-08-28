import React from 'react'
import { StructureEntity } from '../../../pages/[username]/[slug]'
import { Spinner } from '../../atoms/Spinner/Spinner';
import { Logo } from '../../molecules/Logo/Logo'
import { StructureListItem } from '../../molecules/StructureListItem/StructureListItem'

export interface Props {
  loading: Boolean;
  list: Array<StructureEntity>;
}

export const Browse: React.FC<Props> = function ({ loading, list }) {
  const items = list.map((item) => {
    return (
      <StructureListItem
        key={item.code}
        entity={item}
        showAuthor
      />
    )
  })

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-shrink justify-between p-12 bg-gray-900">
        <div className="flex flex-grow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1>Browse</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-shrink-0">
          <Logo />
        </div>
      </div>
      <div className="flex-grow h-full overflow-y-auto overflow-x-hidden">
        {loading && (
          <div className="p-12">
            <Spinner />
          </div>
        )}
        {!loading && items.length > 0 && items}
        {!loading && items.length === 0 && (
          <div className="p-12 text-4xl">Sorry, nothing found 😔</div>
        )}
      </div>
    </div>
  )
}
