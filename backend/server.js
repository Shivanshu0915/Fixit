const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const connectDB = require("./config/db");
const dotenv = require('dotenv');

//load env
dotenv.config();

// connection to mongoDB
connectDB()

const app = express();
app.use(cors({
    origin: true, // Allows requests from any origin
    credentials: true // Allow cookies, authorization headers, etc.
}));

app.use(express.json());
const PORT = process.env.PORT;

// For handling/accesing refreshToken from cookies.
app.use(cookieParser()); 

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});