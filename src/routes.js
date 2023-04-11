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

// router.delete('/users/deleteAll', UserController.deleteAll)
router.post('/users/login', AuthUserController.authUserService)
router.post('/users', UserController.storage)
router.get('/users', UserController.listUsers)
router.get('/users/details', isAuthenticated, UserController.detailsUser)
router.put('/users/updatePassword/:id', UserController.updatePassword)
router.put('/users/updateUser/:id', UserController.update)


/*CLIENTES*/

router.delete('/client/deleteAll', ClienteController.deleteAll)
router.post('/client/search', isAuthenticated, ClienteController.searchClient)
router.post('/client', isAuthenticated , ClienteController.storage)
router.get('/client/:id', ClienteController.listAll)
router.delete('/client/:id', isAuthenticated, ClienteController.delete)
router.put('/client/:id', isAuthenticated, ClienteController.update)


/*FORNECEDORES*/

router.delete('/fornecedor/deleteAll', FornecedorController.deleteAll)
router.post('/fornecedor', isAuthenticated, FornecedorController.storage)
router.post('/fornecedor/search', isAuthenticated, FornecedorController.searchSupplier)
router.get('/fornecedor/:id', FornecedorController.listAll)
router.put('/fornecedor/:id', isAuthenticated, FornecedorController.update)
router.delete('/fornecedor/:id', isAuthenticated, FornecedorController.delete)

module.exports = router;