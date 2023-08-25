import taskModel from "../models/task.model.js"

export const getTasks = async (req, res) => {
    try {
        const tasksAllFound = await taskModel.find({ user: req.user.id }).populate('user')
        console.log(tasksAllFound)
        if (!tasksAllFound) return res.status(400).json({ message: "Tasks not found" });
        const tasksInfo = {
            page: 1,
            count: tasksAllFound.length,
            tasks: tasksAllFound
        }
        res.json({
            status: 200,
            message: "Success",
            payload: tasksInfo
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body
        const newTask = new taskModel({ title, description, date, user: req.user.id })
        const taskSave = await newTask.save();
        const tasksInfo = {
            id: taskSave.id,
            title: taskSave.title,
            description: taskSave.description,
            date: taskSave.date,
            user: req.user.id
        }
        res.json({
            status: 200,
            message: "Success",
            payload: tasksInfo
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.id).populate('user');
        if (!task) return res.status(400).json({ message: "Task " + req.params.id + " not found" });
        const tasksInfo = {
            id: task.id,
            title: task.title,
            description: task.description,
            date: task.date,
            user: task.user
        }
        res.json({
            status: 200,
            message: "Success",
            payload: tasksInfo
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndDelete(req.params.id)
        if (!task) return res.status(400).json({ message: "Task " + req.params.id + " not found" });
        res.json({
            status: 200,
            message: "Deleted Success",
            payload: {}
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task) return res.status(400).json({ message: "Task " + req.params.id + " not found" });
        res.json({
            status: 200,
            message: "Update Success",
            payload: { task }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}


