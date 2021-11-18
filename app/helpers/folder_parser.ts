export interface FolderParseResult {
  name: string;
  icon: string;
  path: string[];
  children?: { [key: string]: FolderParseResult };
}

export const parse = (text: string): { [key: string]: FolderParseResult } => {
  const output: { [key: string]: FolderParseResult } = {}
  const result = text.match(/(##[^\n]+)+/gmi)
  const SEPARATOR = '/'

  const buildItem = (name: string, path: string[]): FolderParseResult => {
    return {
      name,
      path,
      icon: 'folder-generic',
      children: {}
    }
  }

  const insertChild = (parent, children) => {
    if (children.length > 0) {
      const parents = children.slice(1)
      const value = children[0]
      const newChild = buildItem(value, parent.path.concat(value))
      if (!parent.children[newChild.name]) {
        parent.children[newChild.name] = insertChild(newChild, parents)
      } else {
        // @todo implement it
      }
    }
    return parent
  }

  for (const item of result) {
    const formatted = item.replace(/#/g, '')
    const parts = formatted.split(SEPARATOR).map((t) => t.trim())
    const children = parts.slice(1)
    const firstPart = parts[0]
    const rootItem = buildItem(firstPart, [firstPart])
    if (!output[firstPart]) {
      output[firstPart] = insertChild(rootItem, children)
    } else {
      // @todo implement it
    }
  }

  return output
}
