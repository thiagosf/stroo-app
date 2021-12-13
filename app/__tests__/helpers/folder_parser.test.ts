import { parse } from '../../helpers/folder_utils'

describe('folder_utils', () => {
  describe('parse', () => {
    it('should parse text', () => {
      const text = '# introduction\n\n## public\n\npublic files\n\n## App.tsx\n## src/assets/images\n## src/assets/svgs'
      const result = parse(text)
      const expected = {
        public: {
          name: 'public',
          icon: 'folder-generic',
          path: ['public'],
          children: {}
        },
        'App.tsx': {
          name: 'App.tsx',
          icon: 'typescript',
          path: ['App.tsx'],
          children: {}
        },
        src: {
          name: 'src',
          icon: 'folder-generic',
          path: ['src'],
          children: {
            assets: {
              name: 'assets',
              icon: 'folder-generic',
              path: ['src', 'assets'],
              children: {
                images: {
                  name: 'images',
                  icon: 'folder-generic',
                  path: ['src', 'assets', 'images'],
                  children: {},
                },
                svgs: {
                  name: 'svgs',
                  icon: 'folder-generic',
                  path: ['src', 'assets', 'svgs'],
                  children: {},
                },
              },
            },
          },
        },
      }
      expect(result).toStrictEqual(expected)
    })

    it('should parse null', () => {
      const text = null
      const result = parse(text)
      expect(result).toStrictEqual({})
    })

    it('should parse empty string', () => {
      const text = ''
      const result = parse(text)
      expect(result).toStrictEqual({})
    })

    it('should parse invalid string', () => {
      const text = 'simple text'
      const result = parse(text)
      expect(result).toStrictEqual({})
    })

    it('should do not parse if double hash is in middle of text', () => {
      const text = 'simple text ## test ## other'
      const result = parse(text)
      expect(result).toStrictEqual({})
    })
  })
})
