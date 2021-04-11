const express = require('express')
const mustache = require('mustache-express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const router = require('./routes/index')
const helpers = require('./helpers')
const errorHandler = require('./handlers/errorHandler')

// Configurações
const app = express()

// Json express
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// Cookies, session, flash
app.use(cookieParser(process.env.SECRET))
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(flash())

// Public directory
app.use(express.static(__dirname + '/public'))

app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/User')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// helpers template
app.use((req, res, next) => {
    res.locals.helpers = { ...helpers }
    res.locals.flashes = req.flash()
    res.locals.user = req.user

    if(req.isAuthenticated()) {
        res.locals.helpers.menu = res.locals.helpers.menu.filter(i=>(i.logged))
    } else {
        res.locals.helpers.menu = res.locals.helpers.menu.filter(i=>(i.guest))
    }

    next()
})

app.use('/', router)

// Notfound routers
app.use(errorHandler.notFound)

// Template engine
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'))
app.set('view engine', 'mst')
app.set('views', __dirname + '/views')

// Continue: Enviando E-mail com Node
module.exports = app