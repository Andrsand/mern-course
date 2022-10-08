// hook для работы с сервером
import { useState, useCallback } from 'react'

export const useHttp = () => { // нативный api браузер fetch в формате hook
    const [loading, setLoading] = useState(false) /*возможно потребуется  initialState: перед false */
    const [error, setError] = useState(null) /* возможно потребуется  initialState: перед null */

    const request = useCallback(async (url, methot = 'GET', body = null, headers = {}) => { /*возможно потребуется callback: перед async*/
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, { method, body, headers }) /*возможно потребуется init: после url, */
            const data = await response.json() // когда получаем ответ с сервера - парсим его в json

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, []) /* deps: []) - возможно будет на хватать этой записи */

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}