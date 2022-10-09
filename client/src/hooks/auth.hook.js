// модуль авторизации человека в системе
import { JsonWebTokenError } from "jsonwebtoken"
import { useState, useCallback, useEffect } from "react"

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

    const logout = useCallback(() => { // метод выхода из системы (просто чистит значения)
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName) // чистит localStorage
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return { login, logout, token, userId }

}