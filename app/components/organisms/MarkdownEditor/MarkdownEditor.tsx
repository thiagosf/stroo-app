import React, { useState } from 'react'

export interface Props {
  initialValue: string;
  onChange: (value: string) => void;
  onFocus: (path: string) => void;
}

export const MarkdownEditor: React.FC<Props> = function ({ initialValue, onChange, onFocus }) {
  const [value, setValue] = useState(initialValue)
  const [lines, setLines] = useState(initialValue.split("\n"))

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setValue(value)
    onChange(value)
    setLines(value.split("\n"))
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget
    const lineNumber = textarea.value
      .substr(0, textarea.selectionStart)
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

  return (
    <div className="flex h-full">
      <textarea
        value={value}
        className="bg-transparent border-0 resize-none w-full h-full text-2xl outline-none p-12"
        onChange={handleChange}
        onKeyDown={handleKeyUp}
        onClick={handleKeyUp}
      ></textarea>
    </div>
  )
}
