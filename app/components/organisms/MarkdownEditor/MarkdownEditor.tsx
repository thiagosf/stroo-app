import React from 'react'

export interface Props {
}

export const MarkdownEditor: React.FC<Props> = function ({  }) {
  // const value = `# introduction\n\n## public\n\na public directory\n\n`
  const value = `# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n# introduction\n\n## public\n\na public directory\n\n`
  return (
    <div className="flex h-full">
      <textarea
        value={value}
        className="bg-transparent border-0 resize-none w-full h-full text-2xl outline-none p-12"
      ></textarea>
    </div>
  )
}
