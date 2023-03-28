const express = require('express');
const UserController = require('./app/controllers/UserController')
const ClienteController = require('./app/controllers/ClienteController')
const FornecedorController = require('./app/controllers/FornecedorController')
const AuthUserController = require('./app/controllers/AuthUserController')
const isAuthenticated = require('./app/middlewares/isAuthenticated')
const sendMail = require('./app/controllers/SendMail')

const router = express.Router();

/*Enviar Email*/

router.post('/sendMail', sendMail)

/*USER*/

router.post('/users/login', AuthUserController.authUserService)
router.post('/users', UserController.storage)
router.get('/users', UserController.listUsers)
router.get('/users/details', isAuthenticated, UserController.detailsUser)

/*CLIENTES*/

router.post('/client', isAuthenticated , ClienteController.storage)
router.get('/client', ClienteController.listAll)
router.put('/client', isAuthenticated, ClienteController.update)
router.delete('/client', isAuthenticated, ClienteController.delete)

/*FORNECEDORES*/

router.post('/fornecedor', isAuthenticated, FornecedorController.storage)
router.get('/fornecedor', FornecedorController.listAll)
router.put('/fornecedor', isAuthenticated, FornecedorController.update)
router.delete('/fornecedor', isAuthenticated, FornecedorController.delete)

module.exports = router;