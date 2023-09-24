import React, { Suspense } from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<div className="w-100 d-flex justify-content-center align-items-center" style={{height:"70vh"}}><CSpinner color="primary" /></div>}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
      <Outlet />
    </CContainer>
  )
}

export default React.memo(AppContent)
