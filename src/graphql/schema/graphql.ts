/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any }
}

export type AddressInput = {
  district?: InputMaybe<Scalars['Int']['input']>
  municipality?: InputMaybe<Scalars['Int']['input']>
  province?: InputMaybe<Scalars['Int']['input']>
  village?: InputMaybe<Scalars['String']['input']>
  ward?: InputMaybe<Scalars['Int']['input']>
}

export type AddressSchema = {
  __typename?: 'AddressSchema'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  deletedAt?: Maybe<Scalars['DateTime']['output']>
  district?: Maybe<DistrictSchema>
  id: Scalars['String']['output']
  municipality?: Maybe<MunicipalitySchema>
  province?: Maybe<ProvinceSchema>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  village?: Maybe<Scalars['String']['output']>
  ward?: Maybe<WardSchema>
}

export type AdminInput = {
  details: DetailsInput
  email?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  role: Role
  ward?: InputMaybe<Scalars['Float']['input']>
}

export type AdminLoginSchema = {
  __typename?: 'AdminLoginSchema'
  accessToken?: Maybe<Scalars['String']['output']>
  admin: AdminSchema
  refreshToken?: Maybe<Scalars['String']['output']>
}

export type AdminSchema = {
  __typename?: 'AdminSchema'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  deletedAt?: Maybe<Scalars['DateTime']['output']>
  details?: Maybe<DetailsSchema>
  email: Scalars['String']['output']
  id?: Maybe<Scalars['ID']['output']>
  role: Role
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  ward?: Maybe<WardSchema>
}

export type AdminUpdateInput = {
  details: DetailsInput
  id: Scalars['String']['input']
  role: Role
  ward?: InputMaybe<Scalars['Float']['input']>
}

export type ArgsInput = {
  id: Scalars['String']['input']
}

export type BaseSchema = {
  __typename?: 'BaseSchema'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  deletedAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['ID']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input']
  oldPassword: Scalars['String']['input']
}

export type DetailsInput = {
  firstName: Scalars['String']['input']
  lastName: Scalars['String']['input']
  middleName?: InputMaybe<Scalars['String']['input']>
  phoneNumber?: InputMaybe<Scalars['String']['input']>
}

export type DetailsSchema = {
  __typename?: 'DetailsSchema'
  firstName: Scalars['String']['output']
  lastName: Scalars['String']['output']
  middleName?: Maybe<Scalars['String']['output']>
  phoneNumber?: Maybe<Scalars['String']['output']>
}

export type DistrictSchema = {
  __typename?: 'DistrictSchema'
  code: Scalars['Int']['output']
  districtTitle: Scalars['String']['output']
  districtTitleNepali: Scalars['String']['output']
  id: Scalars['ID']['output']
}

export type LoginInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MunicipalitySchema = {
  __typename?: 'MunicipalitySchema'
  code: Scalars['Int']['output']
  id: Scalars['ID']['output']
  municipalityTitle: Scalars['String']['output']
  municipalityTitleNepali: Scalars['String']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminLogin: AdminLoginSchema
  changePassword: Scalars['String']['output']
  createAdmin: Scalars['String']['output']
  createOfficeSetup: Scalars['String']['output']
  deleteAdmin: Scalars['String']['output']
  updateAdmin: Scalars['String']['output']
  updateOfficeSetup: Scalars['String']['output']
}

export type MutationAdminLoginArgs = {
  data: LoginInput
}

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput
}

export type MutationCreateAdminArgs = {
  data: AdminInput
}

export type MutationCreateOfficeSetupArgs = {
  data: OfficeSetupInput
}

export type MutationDeleteAdminArgs = {
  args: ArgsInput
}

export type MutationUpdateAdminArgs = {
  data: AdminUpdateInput
}

export type MutationUpdateOfficeSetupArgs = {
  data: UpdateOfficeSetupInput
}

export type OfficeSetupInput = {
  address: AddressInput
  email: Scalars['String']['input']
  fax?: InputMaybe<Scalars['String']['input']>
  officeCode: Scalars['String']['input']
  officeName: Scalars['String']['input']
  phoneNumber: Scalars['String']['input']
}

export type OfficeSetupSchema = {
  __typename?: 'OfficeSetupSchema'
  address?: Maybe<AddressSchema>
  email?: Maybe<Scalars['String']['output']>
  fax?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  officeCode?: Maybe<Scalars['String']['output']>
  officeName?: Maybe<Scalars['String']['output']>
  phoneNumber?: Maybe<Scalars['String']['output']>
}

export type PaginatedAdminSchema = {
  __typename?: 'PaginatedAdminSchema'
  data: Array<AdminSchema>
  page: Scalars['Int']['output']
  perPage: Scalars['Int']['output']
  total: Scalars['Int']['output']
  totalPages: Scalars['Int']['output']
}

export type PaginatedResponseClass = {
  __typename?: 'PaginatedResponseClass'
  data: Array<AdminSchema>
  page: Scalars['Int']['output']
  perPage: Scalars['Int']['output']
  total: Scalars['Int']['output']
  totalPages: Scalars['Int']['output']
}

export type PaginationArgs = {
  page?: InputMaybe<Scalars['Float']['input']>
  perPage?: InputMaybe<Scalars['Float']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type ProvinceSchema = {
  __typename?: 'ProvinceSchema'
  code?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['ID']['output']>
  provinceTitle?: Maybe<Scalars['String']['output']>
  provinceTitleNepali?: Maybe<Scalars['String']['output']>
}

export type Query = {
  __typename?: 'Query'
  admin: AdminSchema
  admins: PaginatedAdminSchema
  deleteOfficeSetup: Scalars['String']['output']
  districts: Array<DistrictSchema>
  districtsByProvince: Array<DistrictSchema>
  getOfficeSetup?: Maybe<OfficeSetupSchema>
  municipalities: Array<MunicipalitySchema>
  /** Returns list of provinces */
  provinces: Array<ProvinceSchema>
  wards: Array<WardSchema>
}

export type QueryAdminArgs = {
  args: ArgsInput
}

export type QueryAdminsArgs = {
  data: PaginationArgs
}

export type QueryDeleteOfficeSetupArgs = {
  data: ArgsInput
}

export type QueryDistrictsByProvinceArgs = {
  data: ArgsInput
}

export type QueryMunicipalitiesArgs = {
  data: ArgsInput
}

export type QueryWardsArgs = {
  data: ArgsInput
}

/** The roles that admin can have */
export enum Role {
  MunicipalityAdmin = 'MUNICIPALITY_ADMIN',
  SudoAdmin = 'SUDO_ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  WardAdmin = 'WARD_ADMIN',
  WardSuperAdmin = 'WARD_SUPER_ADMIN',
}

export type SearchArgs = {
  search?: InputMaybe<Scalars['String']['input']>
}

export type UpdateAddressInput = {
  district?: InputMaybe<Scalars['Int']['input']>
  id: Scalars['String']['input']
  municipality?: InputMaybe<Scalars['Int']['input']>
  province?: InputMaybe<Scalars['Int']['input']>
  village?: InputMaybe<Scalars['String']['input']>
  ward?: InputMaybe<Scalars['Int']['input']>
}

export type UpdateOfficeSetupInput = {
  address: AddressInput
  email: Scalars['String']['input']
  fax?: InputMaybe<Scalars['String']['input']>
  id: Scalars['String']['input']
  officeCode: Scalars['String']['input']
  officeName: Scalars['String']['input']
  phoneNumber: Scalars['String']['input']
}

export type WardSchema = {
  __typename?: 'WardSchema'
  id: Scalars['ID']['output']
  wardNumber: Scalars['Float']['output']
  wardNumberNepali: Scalars['String']['output']
}

export type WardsQueryVariables = Exact<{
  data: ArgsInput
}>

export type WardsQuery = {
  __typename?: 'Query'
  wards: Array<{ __typename?: 'WardSchema'; id: string; wardNumber: number; wardNumberNepali: string }>
}

export const WardsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Wards' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ArgsInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'wards' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wardNumber' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wardNumberNepali' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<WardsQuery, WardsQueryVariables>
