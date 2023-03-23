const express = require('express');
const UserController = require('./app/controllers/UserController')
const ClienteController = require('./app/controllers/ClienteController')
const FornecedorController = require('./app/controllers/FornecedorController')
const AuthUserController = require('./app/controllers/AuthUserController')
const isAuthenticated = require('./app/middlewares/isAuthenticated')
const sendMail = require('./app/controllers/SendMail')

const router = express.Router();


router.post('/sendMail', sendMail)

/*USER*/

router.post('/users/login', AuthUserController.authUserService)
router.post('/users', UserController.storage)
router.get('/users', UserController.listUsers)

/*CLIENTES*/

router.post('/clientes', isAuthenticated , ClienteController.storage)
router.get('/clientes', isAuthenticated, isAuthenticated, ClienteController.listAll)
router.put('/clientes', isAuthenticated, ClienteController.update)
router.delete('/clientes', isAuthenticated, ClienteController.delete)

/*FORNECEDORES*/

router.post('/fornecedor', isAuthenticated, FornecedorController.storage)
router.get('/fornecedor', isAuthenticated, FornecedorController.listAll)
router.put('/fornecedor', isAuthenticated, FornecedorController.update)
router.delete('/fornecedor', isAuthenticated, FornecedorController.delete)

module.exports = router;