import express from "express";
import morgan from "morgan";
import cors from "cors";
import "./db.js";
import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import authMiddleware from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", authMiddleware, contactsRouter);
app.use("/users", usersRouter);

// для неіснуючих маршрутів взагалі GET /api/wrongpath або POST /api/contacts123
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
