import {  DocumentNode, gql } from '@apollo/client'

export const ADMIN_LOGIN:DocumentNode = gql`
mutation AdminLogin($data: LoginInput!) {
  adminLogin(data: $data) {
    accessToken
    admin {
      id
      role
      email
      ward {
        id
        wardNumber
      }
      details {
        firstName
        middleName
        lastName
        phoneNumber
      }
    }
  }
}
`
