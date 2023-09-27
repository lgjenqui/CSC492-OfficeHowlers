import express from "express";
import cors from "cors";
import { db } from "./db";
import courseRouter from "../routes/course.routes";

const app = express()
const port = 8080
const corsOptions = {
  origin: '*'
}
app.use(express.json());
app.use("/api/course", courseRouter);
db.sequelize.sync();

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

