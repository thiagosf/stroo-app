import { gql } from '@apollo/client'

export const LIST_STRUCTURES = gql`
  query {
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
