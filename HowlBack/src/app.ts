import express from "express";
import cors from "cors";
import sequelize from "../sequelize_db";
import courseRouter from "../routes/course.routes";
import User from "../models/user.model";

const app = express()
app.use(cors())
const port = 8080
const corsOptions = {
  origin: '*'
}
app.use(express.json());

app.use(async (req, res, next) => {
  const email = req.headers['x-shib_mail'];
  console.log("User creating request: " + email);
  if (email) {
    const user = await User.findByPk(email as string);
    if (!user) {
      await User.create({
        name: "Unset name",
        email: email as string,
      });
      console.log("User not found, created user with email: " + email);
    }
  } else {
    res.status(401).json({ success: false, error: "Unauthenticated user." });
    return;
  }
  next();
});

app.use("/api/course", courseRouter);

app.get('/test', cors(corsOptions), (req, res) => {
  const status = {
    "Status": "Running",
    "Message": "Hello World!"
  }

  res.send(status)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

