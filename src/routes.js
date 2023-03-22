const express = require('express');
const UserController = require('./app/controllers/UserController')
const ClienteController = require('./app/controllers/ClienteController')

const router = express.Router();

/*USER*/

router.post('/users', UserController.storage)
router.get('/users', UserController.listUsers)

/*CLIENTE*/

router.post('/clientes', ClienteController.storage)
router.get('/clientes', ClienteController.listClientes)
router.put('/clientes', ClienteController.updateCliente)

module.exports = router;