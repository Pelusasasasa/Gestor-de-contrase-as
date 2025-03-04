
import CryptoJS from "crypto-js";
import { getEnvVariables } from "../../helpers";
import { useState } from "react";

const { VITE_API_PASSWORDKEY:passwordKey } = getEnvVariables();

const desencriptar = (password) => {
  const decryptedPassword = CryptoJS.AES.decrypt(password, passwordKey)?.toString(CryptoJS.enc.Utf8);
  
  return decryptedPassword;
};

export const PasswordItem = (item) => {

  const [mostrar, setMostrar] = useState(false);

  const handleMostrar = () => {
    setMostrar(!mostrar);
  }

  return (
    <div key={item.title} className="bh-white p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow">
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
            mostrar ? desencriptar(item.password) : '**********'
          }
        </p>
        <button onClick={handleMostrar} className="cursor-pointer text-blue-600 hover:text-blue-500 focus:outline-none">
          Mostrar
        </button>
      </div>
    </div>
  )
};
