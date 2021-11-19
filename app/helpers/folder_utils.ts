export interface FolderParseResult {
  name: string;
  icon: string;
  path: string[];
  children?: { [key: string]: FolderParseResult };
}

export const FOLDER_SEPARATOR = '/'

const getIcon = (name: string): string => {
  // @todo map all common files
  const mapIcons = {
    generic: 'folder-generic',
    github: 'folder-github',
    yml: 'yaml',
    yaml: 'yaml',
    js: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
  }
  let key = name.split('.').pop()
  if (name[0] === '.') {
    key = name.split('.').pop()
  }
  return mapIcons[key] ?? mapIcons.generic
}

const buildParseItem = (name: string, path: string[]): FolderParseResult => {
  return {
    name,
    path,
    icon: getIcon(name),
    children: {}
  }
}

export const parse = (text: string): { [key: string]: FolderParseResult } => {
  const output: { [key: string]: FolderParseResult } = {}
  if (text) {
    const result = text.match(/^(##[^\n]+)+$/gmi) ?? []

    for (const item of result) {
      const formatted = item.replace(/#/g, '')
      const parts = formatted.split(FOLDER_SEPARATOR).map((t) => t.trim())

      let lastRef = null
      for (const index in parts) {
        const child = parts[index]
        if (output[child]) {
          lastRef = output[child]
          continue
        }
        const item = buildParseItem(child, parts.slice(0, +index + 1))
        if (lastRef) {
          if (lastRef.children[child]) {
            lastRef = lastRef.children[child]
            continue
          }
          lastRef.children[child] = item
          lastRef = lastRef.children[child]
        } else {
          output[child] = item
          lastRef = output[child]
        }
      }
    }
  }

  return output
}
