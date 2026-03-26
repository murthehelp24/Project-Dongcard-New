import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider, Outlet } from 'react-router'
import useUserStore from '../stores/userStore'
import AdminLayout from '../layouts/adminLayout'
import UserLayout from '../layouts/userLayout'
import CardDetail from '../components/user/CardDetail'
import History from '../pages/user/History'
import HistoryDetail from '../components/user/HistoryDetail'
import Wishlist from '../pages/user/Wishlist'

const Login = lazy(() => import('../pages/public/Login'))
const Card = lazy(() => import('../pages/user/Card'))
const Payment = lazy(() => import('../pages/user/Payment'))
const Order = lazy(() => import('../pages/user/Order'))
const Dashboard = lazy(() => import('../pages/admin/Dashboard'))
const ManageCard = lazy(() => import('../pages/admin/ManageCard'))
const ManageOrder = lazy(() => import('../pages/admin/ManageOrder'))

const ProtectRoute = ({ allow, children }) => {
  const user = useUserStore(state => state.user)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (!allow.includes(user.role)) {
    return <Navigate to="/login" replace />
  }
  return children ? children : <Outlet />
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/user",
    element: (
      <ProtectRoute allow={["USER", "ADMIN"]}>
        <UserLayout />
      </ProtectRoute>
    ),
    children: [
      { index: true, element: <Card /> },
      { path: "card/:id", element: <CardDetail /> },
      { path: "order", element: <Order /> },
      { path: "payment/:orderId", element: <Payment /> },
      { path: "history", element: <History /> },
      { path: "history/:orderId", element: <HistoryDetail /> },
      { path: "wishlist", element: <Wishlist /> },
    ]
  },

  {
    path: "/admin",
    element: (
      <ProtectRoute allow={["ADMIN"]}>
        <AdminLayout />
      </ProtectRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "manage-card", element: <ManageCard /> },
      { path: "manage-order", element: <ManageOrder /> },
    ]
  },

  // { path: "*", element: <Navigate to="/" replace /> }
])

function AppRouter() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    }>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default AppRouter