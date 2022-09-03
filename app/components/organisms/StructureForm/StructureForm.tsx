import React from 'react'

import { StructureEntity } from '../../../pages/[username]/[slug]'

import { Button } from '../../molecules/Button/Button'
import { FormControl } from '../../molecules/FormControl/FormControl'

import { MarkdownEditor } from '../MarkdownEditor/MarkdownEditor'

export interface Props {
  entity: StructureEntity;
  isSending: boolean;
  onSave: () => void;
  onChange: (field: string, value: string) => void;
  onFocus: (path: string) => void;
}

export const StructureForm: React.FC<Props> = function ({ entity, isSending, onChange, onSave, onFocus }) {
  const buttonLabel = !!entity?.code && entity?.code !== '...' ? 'Update' : 'Publish'

  function handleChangeInput(field: string) {
    return (e: any) => {
      let value = typeof e === 'string' ? e : e.target.value
      if (['type', 'name'].includes(field)) {
        value = value.trim().toLowerCase()
        if (value[value.length - 1] === ' ') {
          value += '-'
        }
        value = value.replace(/[^0-9a-z-]/ig, '')
      }
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
            <FormControl
              label="name"
              value={entity?.name}
              onChange={handleChangeInput('name')}
            />
          </div>
          <div className="flex-shrink-0 flex-grow lg:ml-2">
            <FormControl
              label="type (react, vue, kotlin, etc)"
              value={entity?.type}
              onChange={handleChangeInput('type')}
            />
          </div>
        </div>
        <Button
          filled
          size="large"
          spinner={isSending}
          disabled={isSending}
          onClick={onSave}
        >{buttonLabel}</Button>
      </div>
    </>
  )
}
