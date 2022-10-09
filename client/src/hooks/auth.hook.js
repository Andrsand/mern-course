// модуль авторизации человека в системе
import { JsonWebTokenError } from "jsonwebtoken"
import { useState, useCallback } from "react"

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null) // стейт отвечающий за token
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId, token // token полученный с сервера
        }))
    }, [])

    const logout = useCallback(() => { }, []) // метод выхода из системы

    return { login, logout }

}