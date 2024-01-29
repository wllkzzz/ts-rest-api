import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;


const app = express();
app.use(express.json());


const server = http.createServer(app)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL)
        console.log("MongoDB connected!");
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}


const start = () => {
    try {
      server.listen(PORT, () => {
        console.log(`Server has been started on port: ${PORT}`);
      });
      connectDB();
    } catch (error) {
      console.error(`Error starting server: ${error.message}`);
    }
  };

start()
