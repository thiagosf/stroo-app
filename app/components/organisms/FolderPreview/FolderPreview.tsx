import React from 'react'
import { MarkdownEditor } from '../MarkdownEditor/MarkdownEditor'
import { Structure } from '../Structure/Structure'
import { StructureInfo } from '../StructureInfo/StructureInfo'

export interface Props {
}

// @todo dark and light mode

export const FolderPreview: React.FC<Props> = function ({  }) {
  return (
    <div className="flex flex-grow text-white">
      <div className="flex-1 bg-gradient-to-tl from-purple-700 to-purple-900">
        <div className="p-12 flex-grow h-full flex flex-col">
          <div className="flex-shrink-0">
            <StructureInfo />
          </div>
          <div className="flex-grow mt-8 relative">
            <Structure />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-900 flex flex-col">
        <div className="flex-grow overflow-x-auto">
          <MarkdownEditor />
        </div>
      </div>
    </div>
  )
}
