import { gql } from '@apollo/client'

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    reviewCount
    ratingAverage
    forksCount
    stargazersCount
    language
    ownerAvatarUrl
  }
`

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`

export const PAGE_INFO_DETAILS = gql`
  fragment PageInfoDetails on PageInfo {
    endCursor
    startCursor
    hasNextPage
  }
`
