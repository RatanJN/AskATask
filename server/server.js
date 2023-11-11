require("dotenv").config();
PORT = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { requireLogin } = require("./controllers/auth_controller");
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(cors());

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", requireLogin, taskRoutes);

const userRoutes = require("./routes/userRoute");
app.use("/user", requireLogin, userRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
