import React, { useState } from 'react'

import { convertTreeToMarkdown, isTreeFormatType } from '../../../helpers/folder_utils'
import { Button } from '../../molecules/Button/Button'
import { ConfirmModal } from '../ConfirmModal/ConfirmModal'

export interface Props {
  initialValue: string;
  onChange: (value: string) => void;
  onFocus: (path: string) => void;
}

const ALERT_VALUE_BYTES = 1024 * 1024

export const MarkdownEditor: React.FC<Props> = function ({ initialValue, onChange, onFocus }) {
  const [value, setValue] = useState(initialValue)
  const [tempValue, setTempValue] = useState('')
  const [lines, setLines] = useState(initialValue.split("\n"))
  const showConvertButton = isTreeFormatType(value)

  const handleBeforeInput = (e: any) => {
    const { data } = e
    const bytes = new TextEncoder().encode(data).length
    if (bytes >= ALERT_VALUE_BYTES) {
      setTempValue(data)
      e.preventDefault()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (tempValue) return
    const { value } = e.target
    setNewValue(value)
  }

  const setNewValue = (value: string) => {
    setValue(value)
    onChange(value)
    setLines(value.split("\n"))
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget
    const lineNumber = textarea.value
      .substring(0, textarea.selectionStart)
      .split("\n")
      .length
    let currentLine = lineNumber
    while (currentLine > -1) {
      const lineValue = getLineValue(currentLine)
      if (lineValue.startsWith('##')) {
        focusLineValue(lineValue)
        currentLine = 0
      }
      --currentLine
    }
  }

  const getLineValue = (lineNumber: number): string => {
    return (lines[lineNumber] ?? '').toString()
  }

  const focusLineValue = (lineValue: string): void => {
    const path = lineValue.split('## ')
      .slice(1)
      .join('## ')
    onFocus(path)
  }

  const onConfirmLargeValue = () => {
    setNewValue(tempValue)
    setTempValue('')
  }

  const onCancelLargeValue = () => {
    setTempValue('')
  }

  const handleConvertTreeToMarkdown = () => {
    setNewValue(convertTreeToMarkdown(value))
  }

  return (
    <div className="flex flex-col h-full">
      <ConfirmModal
        opened={!!tempValue}
        onConfirm={onConfirmLargeValue}
        onCancel={onCancelLargeValue}
      >
        <p>You are trying to paste a large text. Possibly it will let slow the app. Are you sure you want to continue?</p>
      </ConfirmModal>
      <div className="flex h-full">
        <textarea
          value={value}
          className="bg-transparent border-0 resize-none w-full h-full text-2xl outline-none p-12"
          onChange={handleChange}
          onKeyDown={handleKeyUp}
          onClick={handleKeyUp}
          onBeforeInput={handleBeforeInput}
        ></textarea>
      </div>
      {showConvertButton && (
        <div className="flex justify-center py-6">
          <Button
            filled
            size="large"
            onClick={handleConvertTreeToMarkdown}
          >Convert tree to markdown</Button>
        </div>
      )}
    </div>
  )
}
