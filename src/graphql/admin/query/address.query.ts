import { type DocumentNode, gql } from '@apollo/client'

export const GET_ALL_PROVINCE: DocumentNode = gql`
  query Provinces {
    provinces {
      id
      provinceTitle
      provinceTitleNepali
      code
    }
  }
`

// for get all district
export const GET_ALL_DISTRICT: DocumentNode = gql`
  query {
    getAllDistrict {
      id
      districtTitle
      districtTitleNepali
      code
    }
  }
`
export const GET_DISTRICT_PROVINCE_ID: DocumentNode = gql`
  query DistrictsByProvince($data: ArgsInput!) {
    districtsByProvince(data: $data) {
      code
      districtTitle
      districtTitleNepali
      id
    }
  }
`
export const GET_MUNICIPALITIES_BY_DISTRICT_ID: DocumentNode = gql`
  query Municipalities($data: ArgsInput!) {
    municipalities(data: $data) {
      code
      id
      municipalityTitle
      municipalityTitleNepali
    }
  }
`
export const GET_WARDS_BY_MUNICIPALITY_ID: DocumentNode = gql`
  query Wards($data: ArgsInput!) {
    wards(data: $data) {
      id
      wardNumber
      wardNumberNepali
    }
  }
`

// for get province by id
export const GET_DISTRICT_BY_PROVINCE: DocumentNode = gql`
  query GetProvince($data: AddressInput!) {
    getProvince(data: $data) {
      districts {
        code
        districtTitles
        districtTitleNepali
        id
      }
    }
  }
`
