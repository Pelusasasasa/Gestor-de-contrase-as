import React from 'react'

export const PasswordItem = (item) => {
  return (
    <div key={item.title  } className="bh-white p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
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
                  item.password
                }
              </p>
              <button className="text-blue-600 hover:text-blue-500 focus:outline-none">
                Mostrar
              </button>
            </div>
          </div>
  )
}
