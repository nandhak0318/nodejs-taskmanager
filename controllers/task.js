const Task = require('../models/task')
const res = require('express/lib/response')
const mongoose = require('mongoose')
const asyncWrapper = require('../middleware/async')
const { contentDisposition } = require('express/lib/utils')
const { createCustomError, CustomAPIError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find()
  res.status(200).json({ tasks })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  if (mongoose.Types.ObjectId.isValid(taskID)) {
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
      return next(
        createCustomError({ msg: `No task with id : ${taskID}` }, 404),
      )
    }
    return res.status(200).json({ task })
  } else {
    return next(createCustomError({ msg: `No task with id : ${taskID}` }, 404))
  }
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  if (mongoose.Types.ObjectId.isValid(taskID)) {
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
      return next(
        createCustomError({ msg: `No task with id : ${taskID}` }, 404),
      )
    }
    return res.status(200).json({ task })
  } else {
    return next(createCustomError({ msg: `No task with id : ${taskID}` }, 404))
  }
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  if (mongoose.Types.ObjectId.isValid(taskID)) {
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return next(
        createCustomError({ msg: `No task with id : ${taskID}` }, 404),
      )
    }
    return res.status(200).json({ task })
  } else {
    return next(createCustomError({ msg: `No task with id : ${taskID}` }, 404))
  }
})

module.exports = {
  getTask,
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
}
