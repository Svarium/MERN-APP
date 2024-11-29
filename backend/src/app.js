import express from 'express';
import morgan from 'morgan';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';


const app = express();

dotenv.config();

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true); // Permite cualquier origen
    },
    credentials: true, // Habilita el envío de cookies
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


//ROUTES
app.use('/api/v1', authRoutes)
app.use('/api/v1', taskRoutes)

export default app;

