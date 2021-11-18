import { parse } from '../../helpers/folder_parser'

describe('folder_parser', () => {
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
        icon: 'folder-generic',
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
    console.log(JSON.stringify(result));
    expect(result).toStrictEqual(expected);
  })
})
