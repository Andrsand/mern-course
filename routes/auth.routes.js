const { Router } = require('express') // подключаем роутер из express
const bcrypt = require('bcryptjs') // библиотека для шифрования паролей можно хеширвать и сравнивать пароли
const User = require('../models/User') // подключаем модель User
const router = Router() // сoздаем роутер

// /api/auth/register
router.post('/register', async (req, res) => {
    try {

        const { email, password } = req.body // поля email и password получакм с фронтенда

        const candidate = await User.findOne({ email }) // модель User проверяет с помощью findOne существует уже такой email или нет.

        if (candidate) {                                // если в базе уже есть такой email то выводим сообщение...
            return res.status(400).json({ message: 'Такой пользователь уже существует' })
        }

        const hashedPassword = await bcrypt.hash(password, 12) // обращаемся к модулю bcrypt, хешируем пароль и указываем 12 для большей шифровки.
        const user = new User({ email, password: hashedPassword }) // после проверки создаем нового пользователя user с уникальным email и захешированным паролем

        await user.save() // ждем когда пользователь сохранится

        res.status(201).json({ message: 'Пользователь создан' })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

// /api/auth/login
router.post('/login', async (req, res) => {

})
module.exports = router // из модуля экспотируеми объект роутера