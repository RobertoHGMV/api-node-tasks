const express = require('express');
const routes = express.Router();

const TaskController = require("./controllers/TaskController");

routes.get("/tasks", TaskController.getAllPaginate);
routes.get("/tasks/all", TaskController.getAll);
routes.get("/tasks/:id", TaskController.getByKey);
routes.post("/tasks", TaskController.create);
routes.put("/tasks/:id", TaskController.update);
routes.delete("/tasks/:id", TaskController.delete);

module.exports = routes;