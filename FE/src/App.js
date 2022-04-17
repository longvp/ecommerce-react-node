import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PATH } from './utilities/const'

import RouteClient from './routes/RouteClient'

import AdminRegister from './containers/ViewAdmin/AdminRegister/AdminRegister'
import AdminLogin from './containers/ViewAdmin/AdminLogin/AdminLogin'
import RouteAdmin from './routes/RouteAdmin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<RouteClient />} />
          <Route path={PATH.ADMIN_REGISTER} element={<AdminRegister />} />
          <Route path={PATH.ADMIN_LOGIN} element={<AdminLogin />} />
          <Route path='/system-admin/*' element={<RouteAdmin />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </>
  )
}

export default App
