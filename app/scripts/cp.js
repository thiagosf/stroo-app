/**
 * How to use:
 *
 * node scripts/cp.js atoms Name
 * node scripts/cp.js molecules Name
 * node scripts/cp.js organisms Name
 * node scripts/cp.js pages Name
 * node scripts/cp.js templates Name
 */

const fs = require('fs').promises
const path = require('path')

async function main () {
  const args = process.argv.slice(2)
  const type = args[0]
  const name = args[1]
  const withStorybook = args[2]
  const componentsPath = path.join(
    __dirname,
    '../components'
  )
  const exists = await alreadyExists(componentsPath, type, name)

  if (!exists) {
    // const index = templates.index(name, type)
    const component = templates.component(name, type)
    const story = templates.story(name, type)
    // const styles = templates.styles(name, type)

    await ensureExistsDirectory(componentsPath)
    await ensureExistsDirectory(`${componentsPath}/${type}`)
    await ensureExistsDirectory(`${componentsPath}/${type}/${name}`)

    // await createFile(
    //   `${componentsPath}/${type}/${name}/index.tsx`,
    //   index
    // )
    await createFile(
      `${componentsPath}/${type}/${name}/${name}.tsx`,
      component
    )
    if (withStorybook) {
      await createFile(
        `${componentsPath}/${type}/${name}/${name}.stories.tsx`,
        story
      )
    }
    // await createFile(
    //   `${componentsPath}/${type}/${name}/styles.module.css`,
    //   styles
    // )
  } else {
    console.log('Component already exists!')
  }
}

const templates = {
  index: name => `export { default as ${name} } from './${name}'
`,
  component: name => `import React from 'react'

export interface Props {
  children?: React.ReactNode;
}

export const ${name}: React.FC<Props> = function ({ children }) {
  return (
    <div className="flex">
      {children}
    </div>
  )
}
`,
  story: (name, type) => `import React from 'react'
import ${name} from './${name}'

export default {
  title: '${type}/${name}',
  component: ${name},
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

export const Default = props => <${name} {...props} />
`,
  styles: name => `.${name.toLowerCase()} {}
`
}

const alreadyExists = async (componentsPath, type, name) => {
  const fullpath = path.join(
    componentsPath,
    type,
    name,
    `${name}.tsx`
  )
  return existsDirectory(fullpath)
}

const createFile = async (fullpath, content) => {
  return fs.writeFile(fullpath, content)
}

const existsDirectory = async fullpath => {
  try {
    await fs.stat(path.join(fullpath))
    return true
  } catch (error) {
    return false
  }
}

const ensureExistsDirectory = async fullpath => {
  if (!(await existsDirectory(fullpath))) {
    return fs.mkdir(fullpath)
  }
}

main()
