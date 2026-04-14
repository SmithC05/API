const mongoose = require('mongoose');

const Task = require('../models/task.model');
const createError = require('../utils/createError');

const isAdmin = (user) => {
  return user && user.role === 'admin';
};

const isTaskOwner = (task, userId) => {
  return task.userId.toString() === userId;
};

const formatTask = (task) => {
  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    userId: task.userId.toString()
  };
};

const isValidTaskId = (taskId) => {
  return mongoose.Types.ObjectId.isValid(taskId);
};

const findTaskById = async (taskId) => {
  if (!isValidTaskId(taskId)) {
    return null;
  }

  return Task.findById(taskId);
};

const ensureTaskAccess = (task, user) => {
  if (!task) {
    throw createError(404, 'Task not found', 'No task was found with the given id');
  }

  // Admin can access every task.
  // Regular users can only access tasks they created.
  if (!isAdmin(user) && !isTaskOwner(task, user.id)) {
    throw createError(403, 'Forbidden', 'You are not allowed to access this task');
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newTask = await Task.create({
      title: title,
      description: description || '',
      userId: req.user.id
    });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        task: formatTask(newTask)
      }
    });
  } catch (error) {
    return next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = isAdmin(req.user)
      ? await Task.find().sort({ createdAt: -1 })
      : await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      data: {
        tasks: tasks.map(formatTask)
      }
    });
  } catch (error) {
    return next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await findTaskById(req.params.id);

    ensureTaskAccess(task, req.user);

    return res.status(200).json({
      success: true,
      message: 'Task fetched successfully',
      data: {
        task: formatTask(task)
      }
    });
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await findTaskById(req.params.id);

    ensureTaskAccess(task, req.user);

    if (title !== undefined) {
      task.title = title;
    }

    if (description !== undefined) {
      task.description = description;
    }

    const updatedTask = await task.save();

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: {
        task: formatTask(updatedTask)
      }
    });
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await findTaskById(req.params.id);

    ensureTaskAccess(task, req.user);

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
