import Task from "../models/task.models.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user');
    if (!tasks) {
        return res.status(404).json({ msg: "Tasks not found" });
    }
    return res.status(200).json(tasks)
}

export const createTask = async (req, res) => {

    const { title, description, dueDate } = req.body;
    const {id} = req.user

    const newTask = new Task({
        title, description, dueDate, user:id
    })

    const saveTask = await newTask.save();

    return res.status(200).json(saveTask);
}

export const getTask = async (req, res) => {

   const taskFound = await Task.findById(req.params.id).populate('user');

    if (!taskFound) {
        return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json(taskFound);
}

export const updateTask = async (req, res) => {

 const taskFound = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!taskFound) {
        return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json(taskFound);

}

export const deleteTask = async (req, res) => {

   const taskFound = await Task.findByIdAndDelete(req.params.id);

    if (!taskFound) {
        return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted!" });
}
