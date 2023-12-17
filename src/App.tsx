import { UserRoute, UserAuthRoute, UserDashboardRoute, AdminAuthRoute, AdminDashboardRoute } from './Routes'
import { Route, Routes } from 'react-router-dom'
import { IRoute } from '@interface/global.interface'
import AdminProtectedRoute from 'ProtectedRoute'

function App() {
  // Function to generate JSX elements for routes
  function renderRoutes(routes: IRoute[], wrapInProtectedRoute: boolean) {
    return routes.map((route: IRoute, index) => (
      <Route
        path={route?.path}
        element={wrapInProtectedRoute ? <AdminProtectedRoute>{route?.element}</AdminProtectedRoute> : route?.element}
        key={index}
      >
        {route?.children && route?.children.length > 0 && renderRoutes(route.children, wrapInProtectedRoute)}
      </Route>
    ))
  }

  return (
    <Routes>
      {/* User landing page route */}
      {UserRoute && UserRoute.length > 0 && renderRoutes(UserRoute, false)}
      {/* User auth routes */}
      {UserAuthRoute && UserAuthRoute.length > 0 && renderRoutes(UserAuthRoute, false)}
      {/* Admin dashboard routes */}
      {UserDashboardRoute && UserDashboardRoute.length > 0 && renderRoutes(UserDashboardRoute, false)}
      {/* Admin auth routes */}
      {AdminAuthRoute && AdminAuthRoute.length > 0 && renderRoutes(AdminAuthRoute, false)}
      {/* Admin dashboard routes */}
      {AdminDashboardRoute && AdminDashboardRoute.length > 0 && renderRoutes(AdminDashboardRoute, false)}
    </Routes>
  )
}

export default App
