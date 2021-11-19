import React, { useState } from 'react'

export interface Props {
  initialValue: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor: React.FC<Props> = function ({ initialValue, onChange }) {
  const [value, setValue] = useState(initialValue)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setValue(value)
    onChange(value)
  }
  return (
    <div className="flex h-full">
      <textarea
        value={value}
        className="bg-transparent border-0 resize-none w-full h-full text-2xl outline-none p-12"
        onChange={handleChange}
      ></textarea>
    </div>
  )
}
