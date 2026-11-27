const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.list);
router.get('/new', taskController.newForm);
router.post('/', taskController.create);
router.get('/:id/edit', taskController.editForm);
router.put('/:id', taskController.update); 

module.exports = router;
