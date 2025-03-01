import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';

export const RegisterPage = () => {

  const { startRegister, errorMessage } = useAuthStore();

    const [userName, setUserName] = useState("");
      const [password, setPassword] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        startRegister(userName, password)
      };

      useEffect(() => {
        if(errorMessage !== undefined){
          Swal.fire('Error en la creacion', `${errorMessage}` ,'error')
        }
      }, [errorMessage])
      

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Crear Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="username" className='block text-sm font-medium text-gray-700'>Usuario</label>
            <input 
              type='text' 
              name='username' 
              id='username'
              value={userName}
              onChange={(e => setUserName(e.target.value))}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Ingrese tu usuario'
            />
          </div>
          <div className='mb-6'>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Contraseña</label>
            <input type="password" 
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Ingresar Contraseña'
            />
            
          </div>
          <button 
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-mb hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer'
          >
            Crear Usuario
            </button>

            <p className='mt-4 text-center text-sm text-gray-600'>
              Ya tienes una cuenta?{" "}
              <Link to='/login' className='font-medium Text-blue-600 hover:text-blue-500'>
                Iniciar Sesion
              </Link>
              

            </p>
        </form>
      </div>
    </div>
  )
}
