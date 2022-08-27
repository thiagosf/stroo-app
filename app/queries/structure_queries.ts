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

export const CREATE_STRUCTURE = gql`
  mutation createStructure(
    $type: String!,
    $name: String!,
    $content: String!
  ) {
    createStructure (
      input: {
        type: $type,
        name: $name,
        content: $content
      }
    ) {
      code
      name
      slug
      content
      user {
        username
      }
    }
  }
`
