const express = require('express');
const routes = express.Router();

const TaskController = require("./controllers/TaskController");

routes.get("/tasks", TaskController.getAll);

module.exports = routes;