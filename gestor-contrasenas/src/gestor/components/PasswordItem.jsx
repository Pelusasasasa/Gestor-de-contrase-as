import { useState } from "react";

import { usePasswordsStore } from "../../hooks/userPasswordsStore";
import Swal from "sweetalert2";
import { desencriptar } from "../../helpers/desencriptarPassword";



export const PasswordItem = (item) => {

  const { passwordsIsSaving, startActivePassword, startDeleteOnePassword } = usePasswordsStore();

  const [mostrar, setMostrar] = useState(false);

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
    <div key={item.title} className="bh-white p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>

        <div className="flex justify-around gap-5">
          <button disabled={passwordsIsSaving ? 'disabled' : ''} className="cursor-pointer" onClick={handlePut}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>

          <button disabled={passwordsIsSaving ? 'disabled' : ''} onClick={handleDelete} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Usuario: </span>
        {
          item.username
        }
      </p>
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          <span className="font-medium">Contraseña: </span>
          {
            mostrar ? desencriptar(item.password) : '**********'
          }
        </p>
        <button onClick={handleMostrar} className="cursor-pointer text-blue-600 hover:text-blue-500 focus:outline-none">
          {mostrar ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      <p className="text-gray-600 mb-1">
        <span className="font-medium">Descripcion: </span>
        {item.descripcion}
      </p>
    </div>
  )
};
