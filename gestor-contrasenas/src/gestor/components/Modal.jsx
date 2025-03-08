import { useForm } from '../../hooks/Useform';
import { usePasswordsStore } from '../../hooks';
import { generarContrasenaRandom } from '../../helpers';
import { useEffect } from 'react';
import { desencriptar } from '../../helpers/desencriptarPassword';

// const initialForm = {
//     username: '',
//     password: '',
//     title: '',
//     desc: ''
// }

export const Modal = ({ closeModal }) => {
    const { activePassword, startCreatePasswords, startEmptyPassword, startPutPassword } = usePasswordsStore();
    const { title, username, password, descripcion, onInputChange, formState } = useForm(activePassword);


    const handleSubmit = (e) => {
        e.preventDefault();

        startCreatePasswords(formState);

        closeModal()
    };

    const startRandom = () => {
        const newPassword = generarContrasenaRandom();
        onInputChange({ target: { name: 'password', value: newPassword } });
    };

    const cerrarModal = () => {
        startEmptyPassword()
        closeModal();
    };

    const handleputPassword = () => {
        startPutPassword(formState._id, formState);

        closeModal();
    };

    useEffect(() => {
        if (activePassword.password) {
            const passwordDesencriptada = desencriptar(activePassword.password);

            onInputChange({ target: { name: 'password', value: passwordDesencriptada } });
        }
    }, [activePassword]);

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/80 z-50'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6'>Agregar Nueva Contraseña</h2>

                <form onSubmit={handleSubmit}>
                    {/* Campo Titulo */}
                    <div className='mb-4'>
                        <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Titulo</label>
                        <input onChange={onInputChange} name='title' type="text" value={title} id="title" className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none fcous:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='Ej: Cuenta de Gmail' />
                    </div>

                    {/* Campo Usuario */}
                    <div className='mb-4'>
                        <label htmlFor="username" className='block text-sm font-medium text-gray-700'>UserName</label>
                        <input onChange={onInputChange} name='username' value={username} id="username" className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none fcous:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='ejemplo@ejemplo.com' />
                    </div>

                    {/* Campo Password */}
                    <div className='mb-4'>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Contraseña</label>
                        <div className='flex items-center gap-2'>
                            <input onChange={onInputChange} name='password' type="text" value={password} id="password" className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none fcous:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='********' />
                            <button onClick={startRandom} type='button' className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>Generar</button>
                        </div>
                    </div>

                    {/* Campo Descripcion */}
                    <div className='mb-4'>
                        <label htmlFor="descripcion" className='block text-sm font-medium text-gray-700'>Descripcion</label>
                        <textarea id="descripcion" name='descripcion' onChange={onInputChange} value={descripcion} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder='Agregar una descripcion (opcional)'></textarea>
                    </div>

                    {/* Botones */}
                    <div className='flex justify-end gap-4'>
                        <button type='button' onClick={cerrarModal} className='cursor-pointer px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none'>Cancelar</button>
                        {!activePassword._id && <button type='submit' className='cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>Guardar</button>}
                        {activePassword._id && <button type='button' onClick={handleputPassword} className='cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>Modificar</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}
