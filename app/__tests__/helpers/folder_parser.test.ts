import { parse, parseFromTree, parseLineTree } from '../../helpers/folder_utils'

describe('folder_utils', () => {
  describe('parse', () => {
    it('should parse text', () => {
      const text = '# introduction\n\n## public\n\npublic files\n\n## App.tsx\n## src/assets/images\n## src/assets/svgs'
      const result = parse(text)
      const expected = {
        public: {
          level: undefined,
          name: 'public',
          icon: 'folder-generic',
          path: ['public'],
          children: {}
        },
        'App.tsx': {
          level: undefined,
          name: 'App.tsx',
          icon: 'typescript',
          path: ['App.tsx'],
          children: {}
        },
        src: {
          level: undefined,
          name: 'src',
          icon: 'folder-generic',
          path: ['src'],
          children: {
            assets: {
              level: undefined,
              name: 'assets',
              icon: 'folder-generic',
              path: ['src', 'assets'],
              children: {
                images: {
                  level: undefined,
                  name: 'images',
                  icon: 'folder-generic',
                  path: ['src', 'assets', 'images'],
                  children: {},
                },
                svgs: {
                  level: undefined,
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

  describe('parseFromTree', () => {
    const mainExpected = {
      'README.md': {
        level: 1,
        name: 'README.md',
        icon: 'markdown',
        path: ['README.md'],
        children: {}
      },
      app: {
        level: 1,
        name: 'app',
        icon: 'folder-generic',
        path: ['app'],
        children: {
          'README.md': {
            level: 2,
            name: 'README.md',
            icon: 'markdown',
            path: ['app', 'README.md'],
            children: {}
          },
          'assets': {
            level: 2,
            name: 'assets',
            icon: 'folder-generic',
            path: ['app', 'assets'],
            children: {
              'image.png': {
                level: 3,
                name: 'image.png',
                icon: 'folder-generic',
                path: ['app', 'assets', 'image.png'],
                children: {}
              }
            }
          },
          'tailwind.config.js': {
            level: 2,
            name: 'tailwind.config.js',
            icon: 'javascript',
            path: ['app', 'tailwind.config.js'],
            children: {}
          }
        }
      }
    }

    it('parses line', () => {
      const line1 = '├── README.md'
      const result1 = parseLineTree(line1)
      expect(result1).toStrictEqual({ name: 'README.md', level: 1 })

      const line2 = '│   │   ├── fileMock.js'
      const result2 = parseLineTree(line2)
      expect(result2).toStrictEqual({ name: 'fileMock.js', level: 3 })

      const line3 = '│   │   └── styleMock.js'
      const result3 = parseLineTree(line3)
      expect(result3).toStrictEqual({ name: 'styleMock.js', level: 3 })

      const line4 = '│   │       └── Wrapper.tsx'
      const result4 = parseLineTree(line4)
      expect(result4).toStrictEqual({ name: 'Wrapper.tsx', level: 4 })
    })

    it('should parse tree text without root', () => {
      const text = `├── README.md
└── app
    ├── README.md
    ├── assets
    │   └── image.png
    └── tailwind.config.js`
      const result = parseFromTree(text)
      expect(result).toStrictEqual(mainExpected)
    })

    it('should parse tree text without root and using spaces', () => {
      const text = `├── README.md
└── app
    ├── README.md
    ├── assets
    │   └── image.png
    └── tailwind.config.js`
      const result = parseFromTree(text)
      expect(result).toStrictEqual(mainExpected)
    })

    it('should parse tree text with root', () => {
      const text = `root
├── README.md
└── app
    ├── README.md
    ├── assets
    │   └── image.png
    └── tailwind.config.js`
      const result = parseFromTree(text)
      const expected = {
        'root': {
          level: 0,
          name: 'root',
          icon: 'folder-generic',
          path: ['root'],
          children: {
            'README.md': {
              level: 1,
              name: 'README.md',
              icon: 'markdown',
              path: ['root', 'README.md'],
              children: {}
            },
            app: {
              level: 1,
              name: 'app',
              icon: 'folder-generic',
              path: ['root', 'app'],
              children: {
                'README.md': {
                  level: 2,
                  name: 'README.md',
                  icon: 'markdown',
                  path: ['root', 'app', 'README.md'],
                  children: {}
                },
                'assets': {
                  level: 2,
                  name: 'assets',
                  icon: 'folder-generic',
                  path: ['root', 'app', 'assets'],
                  children: {
                    'image.png': {
                      level: 3,
                      name: 'image.png',
                      icon: 'folder-generic',
                      path: ['root', 'app', 'assets', 'image.png'],
                      children: {}
                    }
                  }
                },
                'tailwind.config.js': {
                  level: 2,
                  name: 'tailwind.config.js',
                  icon: 'javascript',
                  path: ['root', 'app', 'tailwind.config.js'],
                  children: {}
                }
              }
            }
          }
        }
      }
      expect(result).toStrictEqual(expected)
    })
  })
})
