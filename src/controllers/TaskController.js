const mongoose = require('mongoose');

const Task = mongoose.model('Task');

module.exports = {
    async getAllPaginate(req, res) {
        const { page = 1 } = req.query;
        const tasks = await Task.paginate({}, { page, limit: 10 });
        return res.json(tasks);
    },

    async getAll(req, res) {
        const tasks = await Task.find();
        return res.json(tasks);
    },

    async getByKey(req, res) {
        const task = await Task.findById(req.params.id);
        return res.json(task);
    },

    async create(req, res) {
        console.log(req.body);
        const task = await Task.create(req.body);
        return res.json(task);
    },

    async update(req, res) {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(task);
    },

    async delete(req, res) {
        await Task.findByIdAndRemove(req.params.id);
        return res.send();
    }

    //res.status(400).send('Current password does not match');
}