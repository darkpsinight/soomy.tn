import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilSpeedometer,
  cilTv,
  cilGamepad,
  cilTruck,
  cilUser,
  cilCog,
  cilGift
} from '@coreui/icons'
import { CNavItem, CNavTitle , CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

  },
  {
    component: CNavItem,
    name: 'Enchère',
    to: '/dashboard/auctionTables',
    icon: <CIcon icon={cilGamepad} customClassName="nav-icon" />,
   
  },
  {
    component: CNavGroup,
    name: 'Produits',
    to: '/dashboard/products',
    icon: <CIcon icon={cilTv} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste Produits',
        to: '/dashboard/products/list',
      },
      {
        component: CNavItem,
        name: 'Marques',
        to: '/dashboard/products/brands',
      },
      {
        component: CNavItem,
        name: 'Categories',
        to: '/dashboard/products/categories',
      },
      {
        component: CNavItem,
        name: 'Partenaires',
        to: '/dashboard/products/partners',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Transactions',
    to: '/dashboard/transactions',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
   
  },
  {
    component: CNavItem,
    name: 'Cammandes',
    to: '/dashboard/orders',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Utilisateurs',
    to: '/dashboard/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Packs',
    to: '/dashboard/packs',
    icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
  },
 
]

export default _nav
