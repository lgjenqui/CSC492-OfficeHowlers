import express from "express";
import cors from "cors";
import sequelize from "../sequelize_db";
import courseRouter from "../routes/course.routes";

const app = express()
app.use(cors())
const port = 8080
const corsOptions = {
  origin: '*'
}
app.use(express.json());
app.use("/course", courseRouter);
sequelize.sync();

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

