const express = require('express')
const config = require('config')

const app = express() // app - резудльтат работы express т.e. наш сервер

const PORT = config.get('port') || 5000 // получаем строчку port из config/default.json или по умолчанию - 5000
app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`)) // настройка порта для подключения сервера