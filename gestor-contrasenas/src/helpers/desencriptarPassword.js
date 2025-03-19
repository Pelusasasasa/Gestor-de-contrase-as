import CryptoJS from "crypto-js";
import { getEnvVariables } from "../helpers/index";

const { VITE_API_PASSWORDKEY: passwordKey } = getEnvVariables();

export const desencriptar = (password) => {
    console.log(CryptoJS.AES.decrypt(password, passwordKey).toString(CryptoJS.enc.Utf8));
    const decryptedPassword = CryptoJS.AES.decrypt(password, passwordKey)?.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
};
