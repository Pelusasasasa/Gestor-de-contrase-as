import { useState } from "react";

import { usePasswordsStore } from "../../hooks/userPasswordsStore";
import Swal from "sweetalert2";
import { desencriptar } from "../../helpers/desencriptarPassword";



export const PasswordItem = (item) => {

  const { passwordsIsSaving, startActivePassword, startDeleteOnePassword } = usePasswordsStore();

  const [mostrar, setMostrar] = useState(false);

  const copiedPassword = () => {
    navigator.clipboard.writeText(desencriptar(item.password))
  }

  const handleMostrar = () => {
    setMostrar(!mostrar);
  };

  const handleDelete = async () => {

    const { isConfirmed } = await Swal.fire({
      title: 'Seguro que quiere Eliminar la contraseña',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      showCancelButton: true
    });

    if (isConfirmed) {
      startDeleteOnePassword(item._id);
    };


  };

  const handlePut = async () => {

    startActivePassword(item._id)

    item.abrirVentana(true)
  };

  return (
    <div key={item.title} className="flex flex-col gap-2 bh-white p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
      </div>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Usuario: </span>
        {
          item.username
        }
      </p>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 flex gap-2">
          <span className="font-medium">Contraseña: </span>
          {
            mostrar ? desencriptar(item.password) : '**********'
          }
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={copiedPassword}
              className="w-5 h-5 text-gray-500 hover:text-blue-500 cursor-pointer"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </span>
        </p>

        <button onClick={handleMostrar} className="cursor-pointer text-blue-600 hover:text-blue-500 focus:outline-none">
          {mostrar ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {item.descripcion && <p className="text-gray-600 mb-1">
        <span className="font-medium">Descripcion: </span>
        {item.descripcion}
      </p>}


      <div className="flex justify-around gap-5 mt-auto">
        <button disabled={passwordsIsSaving ? 'disabled' : ''} className="hover:bg-gray-200 cursor-pointer flex gap-4 border border-gray-400 px-2 py-0.5 items-center" onClick={handlePut}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Editar
        </button>

        <button disabled={passwordsIsSaving ? 'disabled' : ''} onClick={handleDelete} className="text-white text-lg hover:bg-red-400 cursor-pointer flex gap-4 bg-red-500 px-2 py-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  )
};
