const Task = require('../models/task');

exports.list = async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ dueDate: 1 }).lean();
        res.render('tasks/index', { tasks });
    } catch (err) {
        next(err);
    }
}

exports.newForm = (req, res) => {
  res.render('tasks/form', { title: 'Add item', task: {}, errors: [] });
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
      return res.status(400).render('tasks/form', { title: 'Add item', task: req.body, errors });
    }
    next(err);
  }
};
