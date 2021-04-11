const mongoose = require('mongoose')

require('dotenv').config({path:'variables.env'})

// Connection Database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error('ERRO: ' + error.message)
})

// Loading all models
require('./models/Post')

const app = require('./app')
app.set('port', process.env.PORT || 7777)
const server = app.listen(app.get('port'), () => {
    console.log(`Servidor rodando na porta http://localhost:${process.env.PORT}`)
})