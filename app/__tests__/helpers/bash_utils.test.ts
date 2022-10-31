import { isFile, isSafeStructure } from '../../helpers/bash_utils'

describe('bash_utils', () => {
  describe('isFile', () => {
    it('tests a lot of files', () => {
      expect(isFile('file.txt')).toEqual(true)
      expect(isFile('.gitignore')).toEqual(true)
      expect(isFile('Dockerfile')).toEqual(true)
      expect(isFile('.env')).toEqual(true)
      expect(isFile('.eslint')).toEqual(true)
      expect(isFile('.sample.env')).toEqual(true)
      expect(isFile('.babelrc')).toEqual(true)
    })

    it('tests a lot of directories', () => {
      expect(isFile('dir')).toEqual(false)
      expect(isFile('.git')).toEqual(false)
      expect(isFile('.vscode')).toEqual(false)
    })
  })

  describe('isSafeStructure', () => {
    it('is not safe if includes more than one dot', () => {
      expect(isSafeStructure(['../dir'])).toEqual(false)
      expect(isSafeStructure(['dir', '../dir'])).toEqual(false)
      expect(isSafeStructure(['dir/../other'])).toEqual(false)
      expect(isSafeStructure(['/dir/../other'])).toEqual(false)
      expect(isSafeStructure(['/dir/../other'])).toEqual(false)
      expect(isSafeStructure(['.../dir'])).toEqual(false)
      expect(isSafeStructure(['/dir/.../other'])).toEqual(false)
      expect(isSafeStructure(['/dir/..../other'])).toEqual(false)
    })

    it('is safe if includes at last one dot', () => {
      expect(isSafeStructure(['dir'])).toEqual(true)
      expect(isSafeStructure(['/dir'])).toEqual(true)
      expect(isSafeStructure(['dir/other'])).toEqual(true)
      expect(isSafeStructure(['dir', '.git'])).toEqual(true)
      expect(isSafeStructure(['.git'])).toEqual(true)
      expect(isSafeStructure(['auth', '[...nextauth].ts'])).toEqual(true)
      expect(isSafeStructure(['auth', '[...nextauth.ts]'])).toEqual(true)
    })
  })
})
