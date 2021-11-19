import React from 'react'
import ReactMarkdown from 'react-markdown'

export interface Props {
  value: string;
}

export const MarkdownPreview: React.FC<Props> = function ({ value }) {
  return (
    <div className="p-12">
      <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  )
}
