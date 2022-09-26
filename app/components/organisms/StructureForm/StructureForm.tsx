import React from 'react'

import { StructureEntity } from '../../../pages/[username]/[slug]'

import { Button } from '../../molecules/Button/Button'
import { DashedInput } from '../../molecules/DashedInput/DashedInput'

import { MarkdownEditor } from '../MarkdownEditor/MarkdownEditor'

export interface Props {
  entity: StructureEntity;
  isSending: boolean;
  onSave: () => void;
  onChange: (field: string, value: string) => void;
  onFocus: (path: string) => void;
  onDestroy: () => void;
}

export const StructureForm: React.FC<Props> = function ({ entity, isSending, onChange, onSave, onFocus, onDestroy }) {
  const isPublished = !!entity?.code && entity?.code !== '...'
  const buttonLabel = isPublished ? 'Update' : 'Publish'

  function handleChangeInput(field: string) {
    return (value: any) => {
      onChange(field, value)
    }
  }

  return (
    <>
      <div className="flex-grow overflow-x-auto">
        <MarkdownEditor
          initialValue={entity?.content}
          onChange={handleChangeInput('content')}
          onFocus={onFocus}
        />
      </div>
      <div className="flex flex-col px-12 py-6 border-t border-white border-opacity-10 bg-black bg-opacity-30 2xl:flex-row 2xl:justify-between 2xl:items-center">
        <div className="flex flex-col flex-grow mb-8 2xl:mb-0 lg:mr-10 lg:flex-row">
          <div className="flex-shrink-0 flex-grow mb-8 lg:mb-0 lg:mr-2">
            <DashedInput
              label="name"
              value={entity?.name}
              onChange={handleChangeInput('name')}
            />
          </div>
          <div className="flex-shrink-0 flex-grow lg:ml-2">
            <DashedInput
              label="type (react, vue, kotlin, etc)"
              value={entity?.type}
              onChange={handleChangeInput('type')}
            />
          </div>
        </div>
        <div className="flex justify-center items-center center gap-4">
          <Button
            filled
            size="large"
            spinner={isSending}
            disabled={isSending}
            onClick={onSave}
          >{buttonLabel}</Button>
          {isPublished && (
            <Button
              bordered
              spinner={isSending}
              disabled={isSending}
              onClick={onDestroy}
            >Delete</Button>
          )}
        </div>
      </div>
    </>
  )
}
