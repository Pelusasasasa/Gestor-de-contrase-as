import React from 'react'
import { useAuthStore } from '../hooks'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { GestorApp } from '../gestor/pages/GestorApp'
import { RegisterPage } from '../auth/pages/RegisterPage'

export const AppRouter = () => {
    const { status } = useAuthStore()
    console.log(status)
  return (
    <Routes>
        {
            ( status === 'not-authenticated') 
            ? (
                <>
                    <Route path="/auth/*" element={ <LoginPage/> } />
                    <Route path="/auth/register/*" element={ <RegisterPage/> } />
                    <Route path="/*" element={ <Navigate to='/auth/login' /> } />
                </>
                    
            )
            : (
                <>
                <Route path="/*" element={ <GestorApp />} />
                <Route path="/*" element={ <Navigate to='/' /> } />
                </>
            )
            

        }
    </Routes>
  )
}
