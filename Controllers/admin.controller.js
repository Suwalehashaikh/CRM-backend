import { Employee } from "../Models/employee.schema.js";
import bcrypt from "bcrypt";
import { customError } from "../Utils/customError.js";
import { success } from "../Utils/success.js";

const createUserController = async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !role || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Employee.findOne({ email });
    if (user) {
      throw new customError(401, "User already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Employee.create({
      name,
      email,
      phone,
      role,
      password: hashedPassword
    });

   success(res,201,"User created successfully.")
   
};

export { createUserController };
