import { createAccessToken } from "../libs/jwt.js"
import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new userModel({ username, email, password: passwordHash })
        const userSave = await newUser.save()
        const token = await createAccessToken({ id: userSave._id, username: userSave.username, email: userSave.email })
        console.log(userSave)

        res.cookie('token', token)
        const userInfo = {
            id: userSave.id,
            username: userSave.username,
            email: userSave.email,
            token: token,
            createdAt: userSave.createdAt,
            updatedAt: userSave.updatedAt
        }
        res.json({
            status: 200,
            message: "Success",
            payload: userInfo
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const userFound = await userModel.findOne({ email })
        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = await createAccessToken({ id: userFound._id, username: userFound.username, email: userFound.email })

        res.cookie('token', token)
        const userInfo = {
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            token: token,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        }
        res.json({
            status: 200,
            message: "Success",
            payload: userInfo
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('token', "", {
            expires: new Date(0)
        })

        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const profile = async (req, res) => {
    console.log(req.user)
    const userFound = await userModel.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const userInfo = {
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    }
    res.json({
        status: 200,
        message: "Success",
        payload: userInfo
    })
}