import { DocumentNode, gql } from '@apollo/client'

export const OFFICE_CREATE: DocumentNode = gql`
  mutation CreateOfficeSetup($data: OfficeSetupInput!) {
    createOfficeSetup(data: $data)
  }
`

export const OFFICE_UPDATE: DocumentNode = gql`
  mutation UpdateOfficeSetup($data: UpdateOfficeSetupInput!) {
    updateOfficeSetup(data: $data)
  }
`
