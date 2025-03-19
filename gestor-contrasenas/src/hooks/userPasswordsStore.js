import { useDispatch, useSelector } from "react-redux"
import gestorApi from "../api/gestorApi";
import { addPassword, emptyActive, onDeleteAll, onDeletePassword, onPutPassowrd, onSaving, setActive, setPasswords } from "../reducer/passwords/passwordsSlice";

import CryptoJS from "crypto-js";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_PASSWORDKEY: passwordKey } = getEnvVariables();

export const usePasswordsStore = () => {
    const dispatch = useDispatch();

    const { passwords, activePassword, passwordsIsSaving } = useSelector(state => state.password);

    const startActivePassword = async (id) => {
        const password = passwords.find(elem => elem._id === id);

        dispatch(setActive(password));
    };

    const startGetPasswords = async () => {

        const { data } = await gestorApi.get('passwords');

        dispatch(setPasswords(data.password))
    };

    const startCreatePasswords = async (password) => {
        dispatch(onSaving());

        const textoCifrado = CryptoJS.AES.encrypt(password.password, passwordKey).toString();

        password.password = textoCifrado;

        const { data } = await gestorApi.post('passwords', password);

        dispatch(addPassword(data.newPassword));
    };

    const startEmptyPassword = async () => {
        dispatch(emptyActive());
    }

    const startPutPassword = async (id, password) => {
        dispatch(onSaving());

        const textoCifrado = CryptoJS.AES.encrypt(password.password, passwordKey).toString();

        password.password = textoCifrado;

        const { data } = await gestorApi.put(`passwords/${id}`, password);

        dispatch(onPutPassowrd(data.updatePassword));
    };

    const startDeleteOnePassword = async (id) => {
        dispatch(onSaving());

        const { data } = await gestorApi.delete(`passwords/${id}`);

        dispatch(onDeletePassword(data.deletePassword._id));
    };

    const startDeletePasswords = async () => {
        dispatch(onSaving());

        await gestorApi.delete('passwords/userId');

        dispatch(onDeleteAll());
    };

    const startSaving = async () => {
        dispatch(onSaving());
    };



    return {
        //*Propiedades
        activePassword,
        passwords,
        passwordsIsSaving,

        //*Metodos
        startActivePassword,
        startCreatePasswords,
        startEmptyPassword,
        startGetPasswords,
        startDeletePasswords,
        startDeleteOnePassword,
        startPutPassword,
        startSaving
    }
}