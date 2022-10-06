const { Router } = require('express') // подключаем роутер из express
const bcrypt = require('bcryptjs') // библиотека для шифрования паролей можно хеширвать и сравнивать пароли
const config = require('config') // подключение файла конфигурации default.json
const jwt = require('jsonwebtoken') // модуль для регистрации пользователя через jwt-token
const { check, validationResult } = require('express-validator') // модуль для валидации вводимых пользователем данных
const User = require('../models/User') // подключаем модель User
const router = Router() // сoздаем роутер

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(), // проверка что в поле вводится именно email
        check('password', 'Минимальная длина пароля 6 символов') // проверка пароля
            .isLength({ min: 6 }) //**! проверить в случае ошибки синтаксис (video - 37:00) */ isLength - метод из express-validator
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req) // результат express-validator

            if (!errors.isEmpty()) {         // если в errors есть какая-то ошибка - преобразуем errors в массив и выводим сообщение на фронтенд
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })

            }

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
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(), // методы валидации email
        check('password', 'Введите пароль').exists() // exists - метод проверки пароля на существование
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req) // результат express-validator

            if (!errors.isEmpty()) {         // если в errors есть какая-то ошибка - преобразуем errors в массив и выводим сообщение на фронтенд
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
            // логика создания пользователя
            const { email, password } = req.body    // получение полей email и password

            const user = await User.findOne({ email }) // ищем одного единственного пользователя по email

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' }) // если пользователь не найден выводим сообщение...
            }

            // проверка пароля на совпадение
            const isMatch = await bcrypt.compare(password, user.password) // метод из bcrypt сравнивает введенный пароль с паролем из базы

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }

            // авторизация пользователя через jsonwebtoken
            const token = jwt.sign(   // сщздание token с тремя параметрами:
                { userId: user.id },
                config.get('jwtSecret'), // передаем сюда секретный ключ из default.json
                { expiresIn: '1h' }       // объект указывающий время существования token
            )

            res.json({ token, userId: user.id }) // ответ пользователю

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })
module.exports = router // из модуля экспотируеми объект роутера