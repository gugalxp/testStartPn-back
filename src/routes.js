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

router.post('/client', isAuthenticated , ClienteController.storage)
router.post('/client/search/:id', isAuthenticated, ClienteController.searchClient)
router.delete('/client/deleteAll/:id', ClienteController.deleteAll)
router.get('/client/:id', isAuthenticated, ClienteController.listAll)
router.delete('/client/:id', isAuthenticated, ClienteController.delete)
router.put('/client/:id', isAuthenticated, ClienteController.update)


/*FORNECEDORES*/

router.post('/fornecedor', isAuthenticated, FornecedorController.storage)
router.post('/fornecedor/search/:id', isAuthenticated, FornecedorController.searchSupplier)
router.delete('/fornecedor/deleteAll/:id', FornecedorController.deleteAll)
router.get('/fornecedor/:id', isAuthenticated, FornecedorController.listAll)
router.put('/fornecedor/:id', isAuthenticated, FornecedorController.update)
router.delete('/fornecedor/:id', isAuthenticated, FornecedorController.delete)

module.exports = router;