const express = require('express')
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const imageMiddleware = require('../middlewares/imageMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

// Rotas de login
router.get('/', homeController.index)
router.get('/users/login', userController.login)
router.post('/users/login', userController.loginAction)
router.get('/users/logout', userController.logout)

// Rotas de registro
router.get('/users/register', userController.register)
router.post('/users/register', userController.registerAction)

// Rotas de perfil
router.get('/profile',authMiddleware.isLogged, userController.profile)
router.post('/profile',authMiddleware.isLogged, userController.profileAction)

// Rota trocar a senha
router.post('/profile/password', authMiddleware.isLogged, authMiddleware.changePassword)

// Rotas esqueci minha senha
router.get('/users/forget', userController.forget)
router.post('/users/forget', userController.forgetAction)
router.get('/users/reset/:token', userController.forgetToken)
router.post('/users/reset/:token', userController.forgetTokenAction)

// Rota dos posts
router.get('/post/add', authMiddleware.isLogged, postController.add)
router.post('/post/add',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.addAction
)

router.get('/post/:slug/edit', authMiddleware.isLogged, postController.edit)
router.post('/post/:slug/edit',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.editAction
)

router.get('/post/:slug', postController.view)

// Continue: Slug Único com Regex
module.exports = router