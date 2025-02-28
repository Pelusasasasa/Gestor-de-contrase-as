
const passwords = [
    {
      id: 1,
      title: "Cuenta de Gmail",
      username: "usuario@gmail.com",
      password: "********",
    },
    {
      id: 2,
      title: "Cuenta de Netflix",
      username: "usuario@netflix.com",
      password: "********",
    },
    {
      id: 3,
      title: "Cuenta de GitHub",
      username: "usuario@github.com",
      password: "********",
    },
  ];

export const GestorApp = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-6'>

      <div className='text-center mb-8'>
        <h1 className='text-3xl font-Bold text-gray-800'>Hola, Agustin</h1>
        <p className='text-gray-600'>Aqui estan tus contraseñas guardadas</p>
      </div>

      {/* //buscador */}
      <div>
        <div className='max-w-2xl mx-auto mb-8'>
          <input type="text" placeholder='Buscar por titulo o usuario' className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:otuline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'/>
        </div>
      </div>

      {/* Lista de contraseña */}
      <div className='max-w-2xl mx-auto'>
        {passwords.map((item) => (
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
                  item.password
                }
              </p>
              <button className="text-blue-600 hover:text-blue-500 focus:outline-none">
                Mostrar
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
