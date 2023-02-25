var express = require('express');
var router = express.Router();
var notificationController = require('../controllers/notificationController.js');

/*
 * GET
 */
router.get('/', notificationController.list);

/*
 * GET
 */
router.get('/:id', notificationController.show);

/*
 * POST
 */
router.post('/', notificationController.create);

/*
 * PUT
 */
router.put('/:id', notificationController.update);

/*
 * DELETE
 */
router.delete('/:id', notificationController.remove);

module.exports = router;
