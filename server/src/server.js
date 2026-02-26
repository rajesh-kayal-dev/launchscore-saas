import dotenv from 'dotenv'
import app from './app.js'

// import { protect } from "./middlewares/auth.middleware.js";

// app.get("/api/v1/test", protect, (req, res) => {
//   res.json({
//     success: true,
//     message: "Protected route working",
//     user: req.user,
//   });
// });

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})