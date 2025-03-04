export const NavBar = () => {

    return (
        <nav className="bg-white w-full shadow-md fixed top-0 lef-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo o nombre de la aplicación (opcional) */}
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-800">
                            Gestor de Contraseñas
                        </span>
                    </div>

                    {/* Botón de Cerrar Sesión */}

                </div>
            </div>
        </nav>
    )

}