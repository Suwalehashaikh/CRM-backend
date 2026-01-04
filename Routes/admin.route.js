import express from "express"
import { createUserController } from "../Controllers/admin.controller.js"
import { asyncHandler } from "../Utils/asyncHandler.js"

export const adminRoute = express.Router()

adminRoute.post("/create-user",asyncHandler(createUserController))