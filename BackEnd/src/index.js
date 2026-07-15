import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import './Models/conn.js';

import { authRouter } from './Routes/authRoute.js';
import { contactRouter } from './Routes/contactRoute.js';
import { adminRouter } from './Routes/adminRoute.js';
import { reportRouter } from './Routes/reportRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"],
  credentials: true
}));


app.use(
  session({
    secret: "RSI_Session_Key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.get("/", (req, res) =>{
  res.send("Welcome to RSI API");
})

// Use routes
app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);
app.use('/api/report', reportRouter);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});