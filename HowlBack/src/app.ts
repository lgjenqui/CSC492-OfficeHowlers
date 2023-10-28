import express from "express";
import cors from "cors";
import courseRouter from "../routes/course.routes";
import { findOrCreateUser } from "../services/user.service";

const app = express()
app.use(cors())
const port = 8080
const corsOptions = {
  origin: '*'
}
app.use(express.json());

app.use(async (req, res, next) => {
  const email = req.headers['x-shib_mail'] as string;
  console.log("User creating request: " + email);
  if (email) {
    await findOrCreateUser(email);
  } else {
    res.status(401).json({ success: false, error: "Unauthenticated user." });
    return;
  }
  next();
});

app.use("/course", courseRouter);

app.get('/test', cors(corsOptions), (req, res) => {

  console.log(req);
  const status = {
    "Status": "Running",
    "Message": "Hello World!"
  }

  res.send(status)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

