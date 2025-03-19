import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks";
import { usePasswordsStore } from "../../hooks/userPasswordsStore";
import { PasswordItem, Modal } from "../components";
import { NavBar } from "../components/NavBar";
import { Link } from "react-router-dom";


export const GestorApp = () => {

  const { user, startLogOut } = useAuthStore();
  const { passwords, startGetPasswords } = usePasswordsStore();

  const [openModal, setOpenModal] = useState(false);
  const [passwordFilter, setPasswordFilter] = useState(passwords);

  useEffect(() => {
    startGetPasswords();
  }, []);

  useEffect(() => {
    setPasswordFilter(passwords);
  }, [passwords])

  const handleLogOut = () => {
    startLogOut();
  };

  const handleAdd = () => {
    setOpenModal(true)
  };

  const closeModal = () => {
    setOpenModal(false)
  };


  const handlePassword = (e) => {
    setPasswordFilter(passwords.filter(elem => (elem.title.toUpperCase().includes(e.target.value.toUpperCase())) || (elem.username.toUpperCase().includes(e.target.value.toUpperCase()))))
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className="flex items-center cursor-pointer justify-self-end" >
        <Link to='/configuration' className="p-2 w-10 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="feather feather-settings"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </Link>

        <button onClick={handleLogOut} className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none" >
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

      <div className="flex items-center gap-2 p-4">

        {/* //buscador */}
        <div className='flex-1'>
          <input type="text" onChange={handlePassword} placeholder='Buscar por titulo o usuario'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:otuline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
        </div>


        <div onClick={handleAdd}
          className="botom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>

      {/* Lista de contraseña */}
      <div className='mx-auto grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full'>
        {passwordFilter.map((item) => (
          <PasswordItem key={item._id} {...item} abrirVentana={setOpenModal} />
        ))}
      </div>


      {openModal && <Modal closeModal={closeModal} />}
    </div>


  )
}
