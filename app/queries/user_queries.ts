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

export const PRIVATE_PROFILE = gql`
  query me {
    me {
      name
      username
      avatar
    }
  }
`

export const PUBLIC_PROFILE = gql`
  query profile($username: String!) {
    profile (username: $username) {
      name
      username
      avatar
    }
  }
`

export const DESTROY_ACCOUNT = gql`
  mutation destroyAccount {
    destroyAccount
  }
`
