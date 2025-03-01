import { useDispatch, useSelector } from "react-redux"

export const usePasswordsStore = () => {
    const dispatch = useDispatch();

    const {passwords, activePassword, passwordsIsSaving} = useSelector(state => state.password);

    const startGetPasswords = () => {
        
    }

    return {
        //*Propiedades
        activePassword,
        passwords,
        passwordsIsSaving,

        //*Metodos
    }
}