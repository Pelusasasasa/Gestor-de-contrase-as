import React from "react";
import { useAuthStore } from "../../hooks";
import { useForm } from "../../hooks/Useform";
import Swal from "sweetalert2";

const initialState = {
    username: '',
}


const Configuration = () => {

    const { user, startDeleteUser } = useAuthStore();

    const { onInputChange } = useForm(initialState);

    const handleDelete = async() => {
        const {isConfirmed} = await Swal.fire('Seguro que quiere eliminar la cuenta', 'Se eliminaran todas las contraseñas', 'info');
        if(isConfirmed){
            startDeleteUser(user.username);
        }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Configuración</h1>

        {/* Cambiar nombre de usuario */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Cambiar nombre de usuario
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              name="username"
              onChangle={onInputChange}
              value={user.username}
              placeholder="Nuevo nombre de usuario"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Guardar
            </button>
          </div>
        </div>

        {/* Cambiar contraseña */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Cambiar contraseña
          </h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña actual"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirmar nueva contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Cambiar contraseña
            </button>
          </div>
        </div>

        {/* Eliminar cuenta */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Eliminar cuenta
          </h2>
          <p className="text-gray-600 mb-4">
            ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
          </p>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Eliminar cuenta
          </button>
        </div>

        {/* Ver tipo de plan actual */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tu plan actual
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Plan Básico</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Cambiar de plan
            </button>
          </div>
        </div>

        {/* Cambiar de plan */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Cambiar de plan
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">Plan Básico</h3>
                <p className="text-gray-600">$5/mes</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Seleccionar
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">Plan Premium</h3>
                <p className="text-gray-600">$10/mes</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Seleccionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;