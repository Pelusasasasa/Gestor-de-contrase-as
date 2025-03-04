import { useDispatch, useSelector } from "react-redux"
import gestorApi from "../api/gestorApi";
import { addPassword, onSaving, setPasswords } from "../reducer/passwords/passwordsSlice";

import CryptoJS from "crypto-js";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_PASSWORDKEY:passwordKey } = getEnvVariables();

export const usePasswordsStore = () => {
    const dispatch = useDispatch();

    const {passwords, activePassword, passwordsIsSaving} = useSelector(state => state.password);

    const startGetPasswords = async() => {
        
        const { data } = await gestorApi.get('passwords');

        dispatch( setPasswords(data.password))
    };

    const startCreatePasswords = async(password) => {
        dispatch( onSaving());

        const textoCifrado = CryptoJS.AES.encrypt(password.password, passwordKey).toString();

        password.password = textoCifrado;

        const { data } = await gestorApi.post('passwords', password);

        dispatch( addPassword(data.newPassword) );
    };

    return {
        //*Propiedades
        activePassword,
        passwords,
        passwordsIsSaving,

        //*Metodos
        startGetPasswords,
        startCreatePasswords
    }
}