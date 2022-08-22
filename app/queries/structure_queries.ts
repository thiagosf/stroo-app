import { gql } from '@apollo/client'

export const LIST_STRUCTURES = gql`
  query listStructures {
    listStructures {
      code,
      name,
      slug,
      type,
      user {
        username,
        name,
        avatar
      }
    }
  }
`

export const SHOW_STRUCTURE = gql`
  query getStructure($code: String!) {
    getStructure (code: $code) {
      code,
      name,
      slug,
      type,
      content,
      user {
        name,
        avatar,
      }
    }
  }
`
