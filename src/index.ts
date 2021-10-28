require("dotenv").config();
import express from "express";
import connectDB from "../config/database";
import auth from "./routes/auth";
import user from "./routes/user";
import prodotti from "./routes/prodotti";

const app = express();

//db connection
connectDB();
// express config
app.use(express.json());
const PORT = process.env.PORT || 3001;
//initial page
app.get("/", (req, res) => res.send("API running"));

//APIs
app.get("api/auth", auth);
app.get("api/user", user);
app.get("/api/prodotti", prodotti);

//run server
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running on port ${PORT}`);
});
