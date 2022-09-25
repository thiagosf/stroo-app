import React from 'react'

import { StructureEntity } from '../../../pages/[username]/[slug]'

import { Spinner } from '../../atoms/Spinner/Spinner'
import { ScrollSpy } from '../../molecules/ScrollSpy/ScrollSpy'
import { StructureListItem } from '../../molecules/StructureListItem/StructureListItem'
import { BrowseFilters } from '../BrowseFilters/BrowseFilters'

import { Header } from '../Header/Header'

export interface Props {
  loading: boolean;
  list: Array<StructureEntity>;
  loadMore: () => Promise<void>;
}

export const Browse: React.FC<Props> = function ({ loading, list, loadMore }) {
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
      <Header>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <h1>Browse</h1>
          </div>
        </div>
      </Header>
      <BrowseFilters />
      <ScrollSpy
        className="flex-grow h-full overflow-y-auto overflow-x-hidden"
        threshold={100}
        onReachedBottom={loadMore}
      >
        {loading && (
          <div className="p-12 text-center">
            <Spinner />
          </div>
        )}
        {!loading && items.length > 0 && items}
        {!loading && items.length === 0 && (
          <div className="p-12 text-4xl">Sorry, nothing found 😔</div>
        )}
      </ScrollSpy>
    </div>
  )
}
