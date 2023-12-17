import { DocumentNode, gql } from '@apollo/client'

export const CREATE_ADMIN: DocumentNode = gql`
  mutation CreateAdmin($data: AdminInput!) {
    createAdmin(data: $data)
  }
`

export const UPDATE_ADMIN: DocumentNode = gql`
  mutation UpdateAdmin($data: AdminUpdateInput!) {
    updateAdmin(data: $data)
  }
`

export const DELETE_ADMIN: DocumentNode = gql`
  mutation DeleteAdmin($args: ArgsInput!) {
    deleteAdmin(args: $args)
  }
`
