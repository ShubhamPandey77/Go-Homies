require("dotenv").config();
const express = require("express");
const cors = require('cors');
const { connectToMongoDb } = require('./connection');
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT|| 8001;

const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const packageRoute = require('./routes/package');
const vlogRoute = require('./routes/vlog');
const aiRoute = require('./routes/ai');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use("/user", userRoute);
app.use("/post", restrictToLoggedInUserOnly, postRoute);
app.use("/package", packageRoute);
app.use("/vlog", restrictToLoggedInUserOnly, vlogRoute);
app.use("/ai", aiRoute);

connectToMongoDb(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
