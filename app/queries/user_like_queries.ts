import { gql } from '@apollo/client'

export const LIKE = gql`
  mutation like($code: String!) {
    like (code: $code)
  }
`

export const DISLIKE = gql`
  mutation dislike($code: String!) {
    dislike (code: $code)
  }
`

export const IS_LIKED = gql`
  query isLiked($code: String!) {
    isLiked (code: $code)
  }
`
