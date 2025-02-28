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
            dispatch( onLogOut(error.response?.data.msg || 'Credenciales Incorrectas'))
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10)
        }
        
    };

    return {
        //*Propiedades
        status,
        user,
        errorMessage,

        //*Métodos
        startLogin

    
    }

};