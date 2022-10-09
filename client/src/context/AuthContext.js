import { createContext } from "react"; // саздание контекста

function noop() { } // пустая функция

// передача параметров не по древовидной структуре а по всему приложению с помощью context
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})