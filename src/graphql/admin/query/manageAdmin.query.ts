import { DocumentNode,gql } from '@apollo/client'

export const GET_ADMINS: DocumentNode = gql`
query Admins($data: PaginationArgs!) {
    admins(data: $data) {
      data {
        id
        email
        role
        ward {
          id
          wardNumber
        }
        details {
          firstNames
          middleName
          lastName
          phoneNumber
        }
      }
      page
      perPage
      total
      totalPages
    }
  }
  
`
