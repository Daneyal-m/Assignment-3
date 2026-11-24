const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String, required:true, trim:true },
            course: {
                type: String, required:true, trim:true },
            type: {
                type: String, enum: ['Assignment', 'Project', 'Exam', 'Quiz', 'Lab', 'Other'], default: 'Assignment' },
            dueDate:{
                type: Date, required:true },
            priority: {
                type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
            description: {
                type: String, required:false, trim:true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema, 'data');

