import taskModel from "../models/task.model.js"
//import FuzzySearch from 'fuzzy-search';

import fuzzy from "fuzzy"

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

export const searchTasks = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const searchString = req.params.search.toLowerCase();
        const tasksSearch = await taskModel.find({}).populate('user');

        if (!tasksSearch) return res.status(400).json({ message: "Tasks not found" });
/*
        const searcher = new FuzzySearch(tasksSearch, ['title', 'description'], {
            sort: true, caseSensitive: true
        });

        const result = searcher.search(searchString);

        */

        const resultados = []

        tasksSearch.forEach((documento) => {
            const tituloMinusculas = documento.title.toLowerCase();
            const puntuacion = fuzzy.match(searchString, tituloMinusculas);

            
            console.log(puntuacion)
            const umbralPuntuacion = 20;

            if (puntuacion != null && puntuacion.score >= umbralPuntuacion) {
                resultados.push({
                    documento
                });
            }
        });

        const paginatedData = resultados.slice(startIndex, endIndex);
        const tasksInfo = {
            page: page,
            count: resultados.length,
            limit: limit,
            tasks: paginatedData
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


