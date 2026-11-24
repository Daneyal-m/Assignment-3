const Task = require('../models/task');

exports.list = async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ dueDate: 1 }).lean();
        res.render('tasks/index', { tasks });
    } catch (err) {
        next(err);
    }
}
