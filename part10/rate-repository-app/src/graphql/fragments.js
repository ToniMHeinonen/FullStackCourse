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
