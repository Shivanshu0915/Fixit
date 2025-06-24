const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const routes = require("./routes");
const connectDB = require("./config/db");
const dotenv = require('dotenv');

//load env
dotenv.config();

// connection to mongoDB
connectDB()

const app = express();

// Trust proxy (for secure cookies on Render)
app.set('trust proxy', 1);

// app.use(cors({
//     origin: true, // Allows requests from any origin
//     credentials: true // Allow cookies, authorization headers, etc.
// }));

// CORS Handling
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Helmet for securing HTTP headers
app.use(helmet());

app.use(express.json());
const PORT = process.env.PORT || 3000;

// For handling/accesing refreshToken from cookies.
app.use(cookieParser()); 

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});