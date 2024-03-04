// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { getFoodTrucks } from './controller/truckController';

dotenv.config();
const port = process.env.PORT || 3000;

const app: Express = express();
app.use(cors());
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())

app.use(express.static(process.cwd()+"/dist"))
app.post('/api/foodtrucks', getFoodTrucks);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
