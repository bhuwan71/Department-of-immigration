import { lazy } from 'react'
import LazyLoading from 'LazyLoading'
import { IRoute } from '@interface/global.interface'

//  landing page
const LandingPageTemplate = LazyLoading(lazy(() => import('@ui/landingPage/templates/LandingPage.template')))
const LandingPage = LazyLoading(lazy(() => import('@ui/landingPage/pages/LandingPage')))

// user -- auth
const UserLogin = LazyLoading(lazy(() => import('@ui/user/pages/auth/Login')))
const UserSignLogin = LazyLoading(lazy(() => import('@ui/user/pages/auth/SignUp')))

const UserDashboardTemplate = LazyLoading(lazy(() => import('@ui/user/templates/Dashboard.template')))
const PageNotFound = LazyLoading(lazy(() => import('@ui/common/pages/PageNotFound')))
const AuthTemplate = LazyLoading(lazy(() => import('@ui/common/templates/Auth.template')))
const AdminLogin = LazyLoading(lazy(() => import('@ui/admin/pages/auth/Login')))
const AdminTemplate = LazyLoading(lazy(() => import('@ui/admin/templates/Dashboard.template')))
const OfficeSetup = LazyLoading(lazy(() => import('@ui/admin/pages/setup/OfficeSetup')))
const ManageAdmin = LazyLoading(lazy(() => import('@ui/admin/pages/setting/ManageAdmin')))

import Layout from '@ui/common/pages/Layout'
import AboutUsPage from '@ui/common/pages/aboutUs/AboutUsPage'

export const UserRoute: IRoute[] = [
  {
    path: '',
    element: <LandingPageTemplate />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
      {
        path: 'layout',
        element: <Layout />,
      },
      {
        path: 'aboutus/:id',
        element: <AboutUsPage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]

export const UserAuthRoute: IRoute[] = [
  {
    path: '/auth',
    element: <AuthTemplate />,
    children: [
      {
        path: '/auth',
        element: <UserLogin />,
      },
      {
        path: '/auth/user',
        element: <UserLogin />,
      },
      {
        path: '/auth/user/sign-in',
        element: <UserLogin />,
      },
      {
        path: '/auth/user/sign-up',
        element: <UserSignLogin />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]

export const UserDashboardRoute: IRoute[] = [
  {
    path: '/user-dashboard',
    element: <UserDashboardTemplate />,
    children: [
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]

export const AdminAuthRoute: IRoute[] = [
  {
    path: '/auth/admin',
    element: <AuthTemplate />,
    children: [
      {
        path: '/auth/admin',
        element: <AdminLogin />,
      },
      {
        path: '/auth/admin/sign-in',
        element: <AdminLogin />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]

export const AdminDashboardRoute: IRoute[] = [
  {
    path: '/admin-dashboard',
    element: <AdminTemplate />,
    children: [
      {
        path: 'setup/office-setup',
        element: <OfficeSetup />,
      },
      {
        path: 'setup/manage-admin',
        element: <ManageAdmin />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]
