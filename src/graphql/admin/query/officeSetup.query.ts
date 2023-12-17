import { DocumentNode, gql } from '@apollo/client'

export const GET_OFFICE_SETUP: DocumentNode = gql`
  query getOfficeSetup {
    getOfficeSetup {
      address {
        municipality {
          id
          municipalityTitleNepali
          municipalityTitle
        }
        province {
          id
          provinceTitleNepali
          provinceTitle
        }
        district {
          id
          districtTitleNepali
          districtTitle
        }
      }
      email
      fax
      id
      officeCode
      officeName
      phoneNumber
    }
  }
`

export const GET_OFFICE_MUNICIPALITY_ID: DocumentNode = gql`
  query GetOfficeSetup {
    getOfficeSetup {
      address {
        municipality {
          id
        }
      }
    }
  }
`

export const GET_DISTRICT: DocumentNode = gql`
  query DistrictsByProvince($data: AddressIDInput!) {
    districtsByProvince(data: $data) {
      districtTitleNepali
      districtTitle
      id
    }
  }
`
