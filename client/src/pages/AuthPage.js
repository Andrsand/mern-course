import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp() // импорт из hook's httpHook
    const [form, setForm] = useState({ //! стейт обработки вормы возможно нужно добавить initialState: 
        email: '', password: ''
    })

    // useEffect(effect: () => {

    // }, deps: [error])

    useEffect(() => {
        console.log('Error', error)
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        //window.M.updateTextField()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value }) // меняем определенное поле в форме с помощью оператора spread
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) { }

    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) { }

    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>

                                <input placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />

                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{ marginRight: 10 }}
                            disabled={loading} // аерибут disabled будет в значении true если loading в значении true
                            onClick={loginHandler}
                        >
                            Войти
                        </button>

                        <button
                            className="btn grey lighthen-1 black-text"
                            onClick={registerHandler}
                            disabled={loading} // аерибут disabled будет в значении true если loading в значении true
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}