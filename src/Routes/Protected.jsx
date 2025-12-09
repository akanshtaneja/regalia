import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

export const Protected = () => {
    const user = localStorage.getItem('user')
  if (!user) {
    return <Navigate to='/login' replace/>
  }
  return <Outlet />
}
