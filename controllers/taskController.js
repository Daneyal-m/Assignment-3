const Task = require('../models/task');
const mongoose = require('mongoose');

exports.list = async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ dueDate: 1 }).lean();
        res.render('tasks/index', { tasks });
    } catch (err) {
        next(err);
    }
}

exports.newForm = (req, res) => {
  res.render('tasks/form', { title: 'Add item', task: {}, dueValue: '', errors: [], editing: false });
};

exports.create = async (req, res, next) => {
  try {
    await Task.create({
      title: req.body.title,
      course: req.body.course,
      type: req.body.type,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      status: req.body.status,
      notes: req.body.notes
    });
    res.redirect('/tasks'); 
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).render('tasks/form', { title: 'Add item', task: req.body, dueValue: req.body.dueDate, errors, editing: false });
    }
    next(err);
  }
};

exports.editForm = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return next(); 
    const task = await Task.findById(req.params.id).lean();
    if (!task) return next(); 

    const dueValue = new Date(task.dueDate).toISOString().slice(0, 10);
    res.render('tasks/form', { title: 'Edit item', task, dueValue, errors: [], editing: true });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return next();
    const task = await Task.findById(req.params.id);
    if (!task) return next();

    task.title = req.body.title;
    task.course = req.body.course;
    task.type = req.body.type;
    task.dueDate = req.body.dueDate;
    task.priority = req.body.priority;
    task.status = req.body.status;
    task.notes = req.body.notes;
    await task.save(); 

    res.redirect('/tasks');
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).render('tasks/form', {
        title: 'Edit item',
        task: { ...req.body, _id: req.params.id },
        dueValue: req.body.dueDate,
        errors,
        editing: true
      });
    }
    next(err);
  }
};

exports.home = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 }).lean();
    res.render('index', { tasks });
  } catch (err) {
    next(err);
  }
};