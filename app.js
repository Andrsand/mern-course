const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express() // app - резудльтат работы express т.e. наш сервер

const PORT = config.get('port') || 5000 // получаем строчку port из config/default.json или по умолчанию - 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`)) // настройка порта для подключения сервер
  } catch (e) {
    console.log('Server Error', e.message)
    process.exitCode = 1  // если ошибка - выходим из процесса
  }
}

start()