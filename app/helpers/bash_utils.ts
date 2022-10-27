export function createStructureCommands(mainDirectory: string, structure: Array<string>): string {
  const commands = structure.map(name => {
    if (isFile(name)) return fileCommand(mainDirectory, name)
    else return directoryCommand(mainDirectory, name)
  })

  return wrapCommand(commands.join('\n'))
}

export function isSafeStructure(structure: Array<string>): boolean {
  return structure.every((directoryOrFile: string): boolean => {
    return !(/\.{2,}/.test(directoryOrFile))
  })
}

export function wrapCommand(commands: string): string {
  return `#!/usr/bin/env bash \n\n${commands}`
}

export function isFile(name: string): boolean {
  const parts = name.split('.')
  const filename = parts.shift()
  const extension = parts.pop()

  if (!filename) return SPECIAL_DOT_FILES.includes(extension)
  if (!extension) return SPECIAL_FILES.includes(filename)
  if (filename && extension) return true
  return false
}

function directoryCommand(mainDirectory: string, directory: string): string {
  return `mkdir -p ${mainDirectory}/${directory}`
}

function fileCommand(mainDirectory: string, filepath: string): string {
  const file = `${mainDirectory}/${filepath}`
  return `mkdir -p "$(dirname ${file})" && touch ${file}`
}

const SPECIAL_DOT_FILES: Array<string> = [
  'gitignore',
  'env',
  'eslint',
  'babelrc',
]

const SPECIAL_FILES: Array<string> = [
  'Dockerfile',
]
