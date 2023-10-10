require("dotenv").config();

PORT = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
