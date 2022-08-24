import { gql } from '@apollo/client'

export const AUTHORIZE_WITH_GITHUB = gql`
  mutation authorizeWithGithub($code: String!) {
    authorizeWithGithub (code: $code) {
      user {
        username
        name
        avatar
      }
      token
    }
  }
`
