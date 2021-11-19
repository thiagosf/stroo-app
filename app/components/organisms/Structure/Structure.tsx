import React from 'react'
import { FolderParseResult } from '../../../helpers/folder_utils'
import { StructureItem } from '../StructureItem/StructureItem'

export interface Props {
  data: { [key: string]: FolderParseResult };
}

export const Structure: React.FC<Props> = function ({ data }) {
  return (
    <div className="flex flex-col bg-gradient-to-tl from-gray-900 to-gray-800 rounded-2xl p-10 text-2xl overflow-x-auto absolute top-0 left-0 right-0 bottom-0 shadow-2xl">
      <StructureItem name=".storybook" />
      <StructureItem name="public" />
      <StructureItem name="src" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
      <StructureItem name="App.tsx" />
    </div>
  )
}
