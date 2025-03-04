import React, { useEffect } from 'react'
import { useAuthStore } from '../hooks'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { GestorApp } from '../gestor/pages/GestorApp'
import { RegisterPage } from '../auth/pages/RegisterPage'
import Configuration from '../gestor/pages/Configuration'

export const AppRouter = () => {
    const { status,  checkAuthToken } = useAuthStore()
    
    useEffect(() => {
      checkAuthToken();
    }, [])

    if( status === 'checking'){
        return(
            <h3>Cargandoooo....</h3>
        )
    }
    

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
                <Route path="/configuration" element={ <Configuration />} />
                <Route path="/" element={ <GestorApp />} />
                <Route path="/*" element={ <Navigate to='/' /> } />
                </>
            )
            

        }
    </Routes>
  )
}
