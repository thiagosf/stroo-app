import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Header } from '../MainHeader/Header'

import text from './text.md'

export const PrivacyPolicy: React.FC = function () {
  const blockElements = (baseClass: string) => `${baseClass}`

  const titleElements = (baseClass: string) => {
    const classes = `pb-2 mt-8 mb-2 text-gray-500 ${baseClass}`.split(' ')
    return classes.join(' ')
  }

  const components = {
    h1: ({ node, ...props }) =>
      <h1 {...props} className={titleElements('text-4xl')} />,
    h2: ({ node, ...props }) =>
      <h2 {...props} className={titleElements("text-2xl")} />,
    h3: ({ node, ...props }) =>
      <h3 {...props} className={titleElements('text-1xl')} />,
    h4: ({ node, ...props }) =>
      <h4 {...props} className={titleElements('text-base')} />,
    h5: ({ node, ...props }) =>
      <h5 {...props} className={titleElements('text-sm')} />,
    h6: ({ node, ...props }) =>
      <h6 {...props} className={titleElements('text-xs')} />,
    p: ({ node, ...props }) =>
      <p {...props} className={blockElements('text-lg mb-4')} />,
    img: ({ node, ...props }) =>
      <>
        {props.src}
      </>,
    code: ({ node, ...props }) => {
      if (props.inline) {
        return <code className="bg-white bg-opacity-20 rounded-sm py-1 px-2">{props.children}</code>
      }
      return (
        <div className={blockElements('text-lg rounded-md overflow-hidden mb-4')}>
          <code {...props} />
        </div>
      )
    },
    a: ({ node, ...props }) =>
      <a {...props} className={'underline border-b border-dashed border-purple-500 text-purple-500'} target="_blank" rel="noopener"></a>,
    ul: ({ node, ...props }) =>
      <ul {...props} className="mb-4 pl-4 list-disc" />,
    ol: ({ node, ...props }) =>
      <ol {...props} className="mb-4" />,
    blockquote: ({ node, ...props }) =>
      <blockquote {...props} className="border-l-4 border-gray-800 pl-3 italic text-gray-600" />,
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Header>
        <h1>Privacy Policy</h1>
      </Header>
      <div className="font-mono flex-grow h-full overflow-y-auto overflow-x-hidden max-w-lg m-auto py-10 px-12 lg:px-0">
        <ReactMarkdown components={components}>{text}</ReactMarkdown>
      </div>
    </div>
  )
}
