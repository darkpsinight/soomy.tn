import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Auctions= React.lazy(() => import('./views/pages/dashboardPages/auctions'))
const Users = React.lazy(() => import('./views/pages/dashboardPages/users'))
const Products = React.lazy(() => import('./views/pages/dashboardPages/products'))
const Brands = React.lazy(() => import('./views/pages/dashboardPages/brands'))
const Categories = React.lazy(() => import('./views/pages/dashboardPages/categories'))
const Partners = React.lazy(() => import('./views/pages/dashboardPages/partners'))
const Transactions = React.lazy(() => import('./views/pages/dashboardPages/transactions'))
const Orders = React.lazy(() => import('./views/pages/dashboardPages/orders'))
const Packs = React.lazy(() => import('./views/pages/dashboardPages/packs'))

// Base


// Icons


// Notifications


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/auctionTables', name: 'Auctions', element:Auctions, exact: true },
  { path: '/users', name: 'Users', element: Users ,exact: true},
  { path: '/products/list', name: 'Products', element: Products ,exact: true},
  { path: '/products/brands', name: 'Brands', element: Brands ,exact: true},
  { path: '/products/categories', name: 'Categories', element: Categories ,exact: true},
  { path: '/products/partners', name: 'Partners', element: Partners ,exact: true},
  { path: '/transactions', name: 'Transactions', element: Transactions ,exact: true},
  { path: '/orders', name: 'Orders', element: Orders ,exact: true},
  { path: '/packs', name: 'Packs', element: Packs ,exact: true},
 
]

export default routes
