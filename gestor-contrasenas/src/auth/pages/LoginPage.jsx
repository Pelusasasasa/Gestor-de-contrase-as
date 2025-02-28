import { useEffect, useState } from 'react';
import { useAuthStore } from '../../hooks'
import Swal from 'sweetalert2';

export const LoginPage = () => {

  const { 
     errorMessage,
     startLogin
    } = useAuthStore();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    startLogin(userName, password)
  }

  useEffect(() => {
    
    if(errorMessage !== undefined){
      Swal.fire('Error en la autenticacion', `${errorMessage}`, 'error')
    }

  }, [errorMessage])
  

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Iniciar Sesion</h2>
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
            Iniciar Sesion
            </button>
        </form>
      </div>
    </div>
  )
}
