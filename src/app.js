import express from "express";
import morgan from "morgan"
import authRoutes from "./routes/auth.routes.js"
import tasksRoutes from "./routes/task.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5173'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api",authRoutes)
app.use("/api",tasksRoutes)


//console.log('Server on port', 3000);

export default app;