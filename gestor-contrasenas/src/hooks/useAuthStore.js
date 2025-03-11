import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onAddUser, onChecking, onDeleteUser, onLogin, onLogOut, onPutUser } from "../reducer/auth/authSlice";
import gestorApi from "../api/gestorApi";
import { resetPasswords } from "../reducer/passwords/passwordsSlice";
import Swal from "sweetalert2";


export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector((state) => state.auth);

    const startLogin = async (username, password) => {
        dispatch(onChecking());

        try {

            const { data } = await gestorApi.post('users/login', { username, password });
            console.log(data);
            const { user, token } = data;

            //Ponemos el token en el localStorage para futuras peticiones a la api
            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin(user))

        } catch (error) {
            console.log(error)
            dispatch(onLogOut(error.response?.data.msg || 'Credenciales Incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }

    };

    const startRegister = async (username, email, password) => {

        dispatch(onChecking());

        try {

            const { data } = await gestorApi.post('users/new', { username, email, password });

            //Ponemos el token en el localStorage para futuras peticiones a la api
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onAddUser(data.user))

        } catch (error) {
            dispatch(onLogOut(error.response?.data.msg) || 'Problemas para crear la cuenta')
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 1000)

        }

    };

    //Lo uqe hacemos es que verificamos si el token es valido traemos otro y hacemos un login con el nuevo token
    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogOut());

        try {
            const { data } = await gestorApi.post('users/renew', token);

            //Ponemos el token en el localStorage para futuras peticiones a la api
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin(data.user));

        } catch (error) {
            console.log(error);
            localStorage.clear();
            dispatch(onLogOut());
        }
    };

    const startLogOut = async () => {

        dispatch(onLogOut());
        dispatch(resetPasswords());
        localStorage.clear();

    };

    const startUpdateUser = async (user) => {

        try {
            const { data } = await gestorApi.put('users/update', user);

            dispatch(onPutUser(data.user));

            Swal.fire('Cambio de nombre de usuario Exitoso', `Se cambio el usuario a ${data.user.username}`, "success");
        } catch (error) {
            console.log(error);
            Swal.fire('No se Cambio de nombre de usuario', `Error la cambiar el nombre`, "error");
        }

    };

    const startDeleteUser = async (username) => {
        gestorApi.post('users/delete', { username });

        await dispatch(onDeleteUser())
        //TODO ELIMINAR LOS PASSWORDs POR EL USUARIO

        // dispatch(onDeletePasswordForUser());
        localStorage.clear();
    };

    return {
        //*Propiedades
        status,
        user,
        errorMessage,

        //*Métodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogOut,
        startUpdateUser,
        startDeleteUser


    }

};