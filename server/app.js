const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http").Server(app);

//routes
const authRoutes = require("./routes/authRoutes");
const users = require("./routes/users");

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 4000;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET, POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionConfig = {
  name: "userSession",
  secret: COOKIE_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  saveUninitialized: true,
  resave: false,
};

app.use(session(sessionConfig));
app.use(express.json());

//authentication routes
app.use("/auth", authRoutes);
app.use("/user", users);

http.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
