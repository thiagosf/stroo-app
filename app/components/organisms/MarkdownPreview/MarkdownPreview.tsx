import React, { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import '../../../node_modules/rehype-highlight/node_modules/highlight.js/styles/atom-one-dark.css'
import { PathTopPosition } from '../../../contexts/structure_context'
import { FOLDER_SEPARATOR } from '../../../helpers/folder_utils'

export interface Props {
  value: string;
  onTitleClick: (path: string) => void;
  onMountElements: (pathsTopPositions: PathTopPosition[]) => void;
}

export const MarkdownPreview: React.FC<Props> = React.memo(({ value, onTitleClick, onMountElements }) => {
  const boxRef = useRef<HTMLDivElement>()
  const blockElements = (baseClass: string) =>
    `${baseClass}`
  const titleElements = (baseClass: string) =>
    blockElements(`text-gray-500 border-b border-gray-800 pb-2 mt-8 mb-4 ${baseClass}`)
  const components = {
    h1: ({ node, ...props }) =>
      <h1 {...props} className={titleElements('text-4xl -mt-8')} />,
    h2: ({ node, ...props }) =>
      <h2 {...props} className={titleElements("text-2xl cursor-pointer transition-colors duration-300 hover:text-purple-500")} onClick={handleClick(node)} data-title />,
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
      <img {...props} className="block max-w-full" />,
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
      <a {...props} target="_blank" rel="noopener"></a>
  }

  const handleClick = (node: any) => {
    return () => {
      const { value } = node.children[0]
      onTitleClick(value)
    }
  }

  const setPositions = () => {
    const pathsTopPositions: PathTopPosition[] = []
    boxRef.current.querySelectorAll('[data-title]')
      .forEach((e) => {
        const rect = e.getClientRects()
        pathsTopPositions.push({
          path: e.textContent,
          top: rect.item(0).y,
        })
      })
    onMountElements(pathsTopPositions)
  }

  useEffect(() => {
    if (boxRef.current) {
      setPositions()
    }
  }, [boxRef])

  return (
    <div className="p-12" ref={boxRef}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >{value}</ReactMarkdown>
    </div>
  )
})
