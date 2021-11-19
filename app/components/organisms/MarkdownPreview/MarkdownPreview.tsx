import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import '../../../node_modules/rehype-highlight/node_modules/highlight.js/styles/atom-one-dark.css'

export interface Props {
  value: string;
}

export const MarkdownPreview: React.FC<Props> = function ({ value }) {
  const blockElements = (baseClass: string) =>
    `mb-6 ${baseClass}`
  const titleElements = (baseClass: string) =>
    blockElements(`text-gray-500 border-b border-gray-800 pb-2 ${baseClass}`)
  const components = {
    h1: ({ node, ...props }) =>
      <h1 {...props} className={titleElements('text-4xl')} />,
    h2: ({ node, ...props }) =>
      <h2 {...props} className={titleElements('text-2xl')} />,
    h3: ({ node, ...props }) =>
      <h3 {...props} className={titleElements('text-1xl')} />,
    h4: ({ node, ...props }) =>
      <h4 {...props} className={titleElements('text-base')} />,
    h5: ({ node, ...props }) =>
      <h5 {...props} className={titleElements('text-sm')} />,
    h6: ({ node, ...props }) =>
      <h6 {...props} className={titleElements('text-xs')} />,
    p: ({ node, ...props }) =>
      <p {...props} className={blockElements('text-lg')} />,
    code: ({ node, ...props }) =>
      <div className={blockElements('text-lg rounded-md overflow-hidden')}>
        <code {...props} />
      </div>,
  }

  return (
    <div className="p-12">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >{value}</ReactMarkdown>
    </div>
  )
}
