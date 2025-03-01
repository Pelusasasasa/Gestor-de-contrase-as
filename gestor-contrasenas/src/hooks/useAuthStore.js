import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogOut } from "../reducer/auth/authSlice";
import gestorApi from "../api/gestorApi";


export const useAuthStore = () => {
    const dispatch = useDispatch();
    const {status, user, errorMessage} = useSelector((state) => state.auth);

    const startLogin = async(username, password) => {
        dispatch(onChecking());

        try {

            const { data } = await gestorApi.post('users/login', {username, password})
            const { user, token } = data;

            //Ponemos el token en el localStorage para futuras peticiones a la api
            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin(user) )

        } catch (error) {
            console.log(error)
            dispatch( onLogOut(error.response?.data.msg || 'Credenciales Incorrectas'))
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10)
        }
        
    };

    const startRegister = async(username, password) => {

        dispatch(onChecking());

        try {

            const { data } = await gestorApi.post('users/new', {username, password});

            console.log(data);
            
        } catch (error) {
            dispatch(onLogOut(error.response?.data.msg) || 'Problemas para crear la cuenta')
            setTimeout(() => {
                dispatch( clearErrorMessage())
            }, 1000)

        }

    };

    //Lo uqe hacemos es que verificamos si el token es valido traemos otro y hacemos un login con el nuevo token
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');

        if(!token) return dispatch(onLogOut());
        
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
    }

    return {
        //*Propiedades
        status,
        user,
        errorMessage,

        //*Métodos
        checkAuthToken,
        startLogin,
        startRegister

    
    }

};