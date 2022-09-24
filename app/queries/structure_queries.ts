import { gql } from '@apollo/client'

export const LIST_STRUCTURES = gql`
  query listStructures ($filters: StructureListFiltersInput) {
    listStructures (filters: $filters) {
      code,
      name,
      slug,
      type,
      like_count,
      user {
        name,
        username,
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
      like_count,
      user {
        name,
        username,
        avatar,
      }
    }
  }
`

export const CREATE_STRUCTURE = gql`
  mutation createStructure($input: CreateStructureInput!) {
    createStructure (input: $input) {
      code,
      name,
      slug,
      content,
      like_count,
      created_at,
      updated_at,
      user {
        username
      }
    }
  }
`

export const UPDATE_STRUCTURE = gql`
  mutation updateStructure($code: String!, $input: UpdateStructureInput!) {
    updateStructure (code: $code, input: $input) {
      code,
      name,
      slug,
      content,
      like_count,
      created_at,
      updated_at,
      user {
        username
      }
    }
  }
`

export const DESTROY_STRUCTURE = gql`
  mutation destroyStructure($code: String!) {
    destroyStructure (code: $code)
  }
`
