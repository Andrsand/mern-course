const { Router } = require('express') // подключаем роутер из express
const User = require('../models/User') // подключаем модель User
const router = Router() // сoздаем роутер

// /api/auth/register
router.post('/register', async (req, res) => {
    try {

        const { email, password } = req.body // поля email и password получакм с фронтенда

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

// /api/auth/login
router.post('/login', async (req, res) => {

})
module.exports = router // из модуля экспотируеми объект роутера