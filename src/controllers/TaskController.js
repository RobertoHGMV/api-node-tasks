const mongoose = require('mongoose');

const Task = mongoose.model('Task');
const STATUS_CREATED = 201;
const STATUS_NOCONTENT = 204;
const STATUS_BADREQUEST = 400;

const Errors = [];

validate = (task) => {
    if (!task.title || task.title === "")
        Errors.push('Título não informado');

    if (!task.description || task.description === "")
        Errors.push('Descrição não informada');

    if (Errors.length > 0)
        throw new Error();
}

module.exports = {
    async getAllPaginate(req, res) {
        try {
            const { page = 1 } = req.query;
            const tasks = await Task.paginate({}, { page, limit: 10 });
            return res.json(tasks);
        }
        catch (ex) {
            return res.status(STATUS_BADREQUEST).send(Errors);
        }
    },

    async getAll(req, res) {
        try {
            const tasks = await Task.find();
            return res.json(tasks);
        }
        catch (ex) {
            return res.status(STATUS_BADREQUEST).send(Errors);
        }
    },

    async getByKey(req, res) {
        try {
            const task = await Task.findById(req.params.id);
            return res.json(task);
        }
        catch (ex) {
            return res.status(STATUS_BADREQUEST).send(Errors);
        }
    },

    async create(req, res) {
        try {
            validate(req.body);

            const task = await Task.create(req.body);
            return res.status(STATUS_CREATED).json(task);
        }
        catch (ex) {
            return res.status(STATUS_BADREQUEST).send(Errors);
        }
    },

    async update(req, res) {
        try {
            validate(req.body);

            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.json(task);
        }
        catch (ex) {
            return res.status(STATUS_BADREQUEST).send(Errors);
        }
    },

    async delete(req, res) {
        try {
            await Task.findByIdAndRemove(req.params.id);
            return res.status(STATUS_NOCONTENT).send();
        }
        catch (ex) {
            return res.status(STATUS_BADREQUEST).send(ex);
        }
    }
}