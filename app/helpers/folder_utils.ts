export interface FolderParseResult {
  level?: number;
  name: string;
  icon: string;
  path: string[];
  children?: { [key: string]: FolderParseResult };
}

export interface LineTree {
  name: string;
  level: number;
}

export type FormatType = 'tree' | 'markdown'

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
    json: 'json',
    md: 'markdown',
  }
  let key = name.split('.').pop()
  if (name[0] === '.') {
    key = name.split('.').pop()
  }
  return mapIcons[key] ?? mapIcons.generic
}

const buildParseItem = (name: string, path: string[], level?: number): FolderParseResult => {
  return {
    level,
    name,
    path,
    icon: getIcon(name),
    children: {}
  }
}

export const formatType = (text: string): FormatType => {
  return text.includes('├──') && !text.includes('#')
    ? 'tree'
    : 'markdown'
}

export const isTreeFormatType = (text: string): boolean => {
  return formatType(text) === 'tree'
}

export const parse = (text: string): { [key: string]: FolderParseResult } => {
  if (!text) return {}
  const parser = isTreeFormatType(text) ? parseFromTree : parseMarkdown
  return parser(text)
}

export const parseMarkdown = (text: string): { [key: string]: FolderParseResult } => {
  const output: { [key: string]: FolderParseResult } = {}
  if (text) {
    const result = text.match(/^(##[^\n#]+)+$/gmi) ?? []

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

export const parseFromTree = (text: string): { [key: string]: FolderParseResult } => {
  const output: { [key: string]: FolderParseResult } = {}
  const lines = text.trim().split('\n')
  const lastLevels = []

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i]
    const line = parseLineTree(rawLine)
    if (line.level === 0) {
      const item = buildParseItem(line.name, [line.name], line.level)
      output[item.name] = item
      lastLevels[line.level] = item
    } else {
      const parent = lastLevels[line.level - 1]
      if (parent) {
        const path = (parent?.path || []).concat([line.name])
        const item = buildParseItem(line.name, path, line.level)
        parent.children[line.name] = item
        lastLevels[line.level] = item
      } else {
        const item = buildParseItem(line.name, [line.name], line.level)
        output[item.name] = item
        lastLevels[line.level] = item
      }
    }
  }

  return output
}

export const parseLineTree = (line: string): LineTree => {
  const SEPARATOR_ONE = '├──'
  const SEPARATOR_TWO = '└──'
  const regex = new RegExp(`(${SEPARATOR_ONE}|${SEPARATOR_TWO})`)

  let name = line
  let level = 0

  if (regex.test(line)) {
    const separator = line.includes(SEPARATOR_TWO)
      ? SEPARATOR_TWO
      : SEPARATOR_ONE
    const splits = line.split(separator)
    level = splits.shift().length / 4 + 1
    name = splits.shift().trim()
  }

  if (name[0] === '/') name = name.substring(1)
  if (name[name.length - 1] === '/') name = name.substring(0, name.length - 1)

  return { name, level }
}

export const convertTreeToMarkdown = (value: string): string => {
  if (!isTreeFormatType(value)) return value
  const tree = parseFromTree(value)
  let output = ''
  for (const key of Object.keys(tree)) {
    const item = tree[key]
    output += convertTreeItemToMarkdown(item)
  }
  return output
}

export const convertTreeItemToMarkdown = (item: FolderParseResult): string => {
  let value = item.path.join('/')
  value = `## ${value}\n\n`
  for (const key of Object.keys(item.children)) {
    const child = item.children[key]
    value += convertTreeItemToMarkdown(child)
  }
  return value
}
