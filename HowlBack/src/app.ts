import express from "express";
import cors from "cors";
import courseRouter from "../routes/course.routes";
import sessionRouter from "../routes/session.routes";
import ticketRouter from "../routes/ticket.routes";
import userRouter from "../routes/user.routes";
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
  const firstName = req.headers['x-shib_givenname'] as string;
  const lastName = req.headers['x-shib_sn'] as string;
  const role = (req.headers['x-shib_primary'] as string).toLowerCase();
  console.log("User creating request: " + email);
  if (email) {
    await findOrCreateUser(email, firstName, lastName, role);
  } else {
    res.status(401).json({ success: false, error: "Unauthenticated user." });
    return;
  }
  next();
});

app.use("/course", courseRouter);

app.use("/session", sessionRouter);
app.use("/ticket", ticketRouter);

app.get('/test', cors(corsOptions), (req, res) => {

  console.log(req);
  const status = {
    "Status": "Running",
    "Message": "Hello World!"
  }
  console.log(req);

  res.send(status)
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

