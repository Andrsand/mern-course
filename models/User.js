const { Schema, model, Types } = require('mongoose') // забираем из mongoose поля Schema и model 

const schema = new Schema({                                           // создаем shema через конвтруктор каласса Schema
    email: { type: String, required: true, unique: true },            // тип поля - String, обязательное поле , уникальный email пользователя
    password: { type: String, required: true },
    links: [{ type: Types.ObjectId, ref: 'Link' }] // связка модели пользователя и определенной записи в базе данных. ref - указывает к какой модели привязываемся
})
//! если не будет работать разобраться как иеновать model (вмидео с 24 - 28 мин.)
module.exports = model('User', schema) // даем имя нашей модели и схема по которой она работает - это объект Schema