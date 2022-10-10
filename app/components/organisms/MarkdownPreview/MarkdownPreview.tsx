import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

import '../../../node_modules/highlight.js/styles/atom-one-dark.css'
import { PathTopPosition, StructureContext } from '../../../contexts/structure_context'
import { FOLDER_SEPARATOR, getIcon, getTitleIndex, getTitles } from '../../../helpers/folder_utils'
import { Icon } from '../../atoms/Icon/Icon'
import { ContentPadding } from '../../atoms/ContentPadding/ContentPadding'

export interface Props {
  value: string;
  originalValue: string;
  onTitleClick: (path: string) => void;
  onMountElements: (pathsTopPositions: Array<PathTopPosition>) => void;
}

export const MarkdownPreview: React.FC<Props> = React.memo(function MarkdownPreview({ value, originalValue, onTitleClick, onMountElements }) {
  const structureValues = useContext(StructureContext)
  const boxRef = useRef<HTMLDivElement>()
  const [currentPath, setCurrentPath] = useState('')
  const titles = getTitles(originalValue)
  const rehypeHighlightOptions = { ignoreMissing: true }

  const blockElements = (baseClass: string) => `${baseClass}`

  const titleElements = (baseClass: string, props: any = {}, pathElement: boolean = false) => {
    const classes = `relative font-thin border-b border-dotted border-gray-700 pb-2 mt-8 mb-4 ${baseClass}`.split(' ')
    if (pathElement && props.children[0] === currentPath) {
      classes.push('border-purple-500 text-purple-500')
    } else {
      classes.push('text-gray-400')
    }
    return classes.join(' ')
  }

  const components = {
    h1: ({ node, ...props }) =>
      <h1 {...props} className={titleElements('text-4xl -mt-8')} />,
    h2: ({ node, ...props }) => {
      const index = getTitleIndex(props.children[0])
      const title = titles?.[index] ?? props.children
      props.children = [title]

      return (
        <h2 {...props} className={titleElements("flex items-center gap-2 text-2xl cursor-pointer transition-colors duration-300 hover:text-purple-500", props, true)} onClick={handleClick(title)} data-title><Icon name={getIcon(title)} svgClasses="w-5 h-5" /> {props.children}</h2>
      )
    },
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
      <a {...props} className={'underline text-purple-500'} target="_blank" rel="noopener noreferrer"></a>,
    ul: ({ node, ...props }) =>
      <ul {...props} className="mb-4" />,
    ol: ({ node, ...props }) =>
      <ol {...props} className="mb-4" />,
    table: ({ node, ...props }) =>
      <div className="border border-gray-700 px-4 py-2 rounded-md overflow-hidden mb-4">
        <table {...props} className="w-full"></table>
      </div>
  }

  function handleClick(title: string) {
    return () => onTitleClick(title)
  }

  function setPositions() {
    const pathsTopPositions: Array<PathTopPosition> = []
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

  useEffect(() => {
    if (structureValues.currentPath.length > 0) {
      const currentPath = structureValues.currentPath.join(FOLDER_SEPARATOR)
      setCurrentPath(currentPath)
    }
  }, [structureValues])

  return (
    <ContentPadding>
      <div ref={boxRef} style={{ wordBreak: 'break-word' }}>
        <ReactMarkdown
          components={components}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeHighlight, rehypeHighlightOptions]]}
        >{value}</ReactMarkdown>
      </div>
    </ContentPadding>
  )
})
