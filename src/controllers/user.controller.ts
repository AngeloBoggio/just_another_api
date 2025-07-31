import { Request, Response } from "express";
import User from "../models/user.schema";
import bcrypt from "bcrypt";

export const userController = {
  async registerUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ 
        name, 
        email, 
        password: hashedPassword,
        tasks: []
      });
      
      await user.save();

      // Remove password from the returned user object
      const userObject = user.toObject();
      delete (userObject as any).password;
      
      res.status(201).json({ 
        message: "User created successfully", 
        user: userObject 
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(500).json({ 
        message: "Failed to create user", 
        error: error.message 
      });
    }
  }
};
