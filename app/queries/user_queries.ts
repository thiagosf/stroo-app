import { gql } from '@apollo/client'

export const GITHUB_AUTH_URL = gql`
  query githubAuthURL {
    githubAuthURL
  }
`

export const AUTHORIZE_WITH_GITHUB = gql`
  mutation authorizeWithGithub($code: String!) {
    authorizeWithGithub (code: $code) {
      user {
        name
        username
        avatar
      }
      token
    }
  }
`

export const PROFILE = gql`
  query me {
    me {
      name
      username
      avatar
    }
  }
`
