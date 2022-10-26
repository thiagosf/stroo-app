export function createStructureCommands(mainDirectory: string, structure: Array<string>): string {
  const commands = structure.map(name => {
    if (isFile(name)) return fileCommand(mainDirectory, name)
    else return directoryCommand(mainDirectory, name)
  })

  return wrapCommand(commands.join('\n'))
}

export function isSafeStructure(structure: Array<string>): boolean {
  return structure.every((directoryOrFile: string): boolean => {
    // @todo implement it
    return false
  })
}

export function wrapCommand(commands: string): string {
  return `#!/usr/bin/env bash \n\n${commands}`
}

function isFile(name: string): boolean {
  // @todo implement it
  return false
}

function directoryCommand(mainDirectory: string, directory: string): string {
  return `mkdir -p ${mainDirectory}/${directory}`
}

function fileCommand(mainDirectory: string, filepath: string): string {
  return `touch ${mainDirectory}/${filepath}`
}
