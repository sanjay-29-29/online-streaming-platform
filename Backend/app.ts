import express from 'express';
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use('/api',routes);

export default app;