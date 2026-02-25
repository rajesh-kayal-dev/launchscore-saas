import { registerUserService } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data,
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await registerUserService(name, email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};