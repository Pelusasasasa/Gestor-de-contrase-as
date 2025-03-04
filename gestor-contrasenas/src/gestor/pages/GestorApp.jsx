import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks";
import { usePasswordsStore } from "../../hooks/userPasswordsStore";
import { PasswordItem, Modal } from "../components";
import { NavBar } from "../components/NavBar";


export const GestorApp = () => {

  const { user, startLogOut } = useAuthStore();
  const { passwords, startGetPasswords } = usePasswordsStore();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    startGetPasswords()
  }, [])

  const handleLogOut = () => {
    startLogOut();
  };

  const handleAdd = () => {
    setOpenModal(true)
  };

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className="flex items-center cursor-pointer" onClick={handleLogOut}>
        <button
          className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <span className="mr-2">Cerrar Sesión</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-Bold text-gray-800'>Hola, {user.username}</h1>
        <p className='text-gray-600'>Aqui estan tus contraseñas guardadas</p>
      </div>

      <div onClick={handleAdd} className="fixed botom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4" />
        </svg>
      </div>

      {/* //buscador */}
      <div>
        <div className='max-w-2xl mx-auto mb-8'>
          <input type="text" placeholder='Buscar por titulo o usuario' className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:otuline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
        </div>
      </div>

      {/* Lista de contraseña */}
      <div className='max-w-2xl mx-auto'>
        {passwords.map((item) => (
          <PasswordItem key={item._id} {...item} />
        ))}
      </div>


      {openModal && <Modal closeModal={closeModal} />}
    </div>


  )
}
