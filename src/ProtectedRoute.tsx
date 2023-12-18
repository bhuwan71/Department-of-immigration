import React, { ReactNode } from 'react'
import EncryptDecrypt from '@functions/EncryptDecrypt'
import useAuth from '@hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'

interface AdminProtectedRouteProps {
  children: ReactNode
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth()

  const { decrypt } = EncryptDecrypt
  const admin = decrypt(user) as string
  const adminDetails = JSON.parse(admin || '{}')

  const location = useLocation()

  if (!adminDetails?.accessToken) {
    return <Navigate to='/auth/admin' state={{ from: location }} replace />
  }
  return <>{children}</>
}

export default AdminProtectedRoute
