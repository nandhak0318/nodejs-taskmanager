const express = require('express')
const res = require('express/lib/response')
const { route } = require('express/lib/router')
const {
  getTask,
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} = require('../controllers/task')
const router = express.Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').delete(deleteTask).patch(updateTask).get(getTask)

module.exports = router
