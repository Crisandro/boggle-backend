import CryptoJS from "crypto-js";

const SECRET_KEY = "SandroBoggle";

export function encrypt(value: unknown): string {
    return CryptoJS.AES.encrypt(
        JSON.stringify(value),
        SECRET_KEY
    ).toString();
}

export function decrypt<T>(cipherText: string): T | null {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        return decrypted ? JSON.parse(decrypted) as T : null;
    } catch {
        return null;
    }
}