import express from "express"
import compression from "compression";
import dotenv from "dotenv";
import http from "http";
dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;


const app = express();
app.use(express.json());
app.use(compression())

const server = http.createServer(app)


const start = async () => {

    server.listen(3000, () => {
        console.log(` app listening on port 3000`);
    })
    
}

start()
