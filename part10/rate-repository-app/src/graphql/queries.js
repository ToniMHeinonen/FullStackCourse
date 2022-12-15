import { gql } from '@apollo/client'
import { REPOSITORY_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  query ($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`

export const GET_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      ...RepositoryDetails
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
