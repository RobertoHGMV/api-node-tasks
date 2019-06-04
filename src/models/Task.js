const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    important: {
        type: Boolean,
        default: false
    },
    daysToCompletion: {
        type: Number
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

TaskSchema.plugin(mongoosePaginate);
mongoose.model("Task", TaskSchema);