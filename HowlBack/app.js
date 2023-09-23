const express = require('express')
const app = express()
const port = 8080
const db = require("./db.js");
const cors = require('cors')

var corsOptions = {
  origin: '*'
}

db.sequelize.sync();

app.get('/test', cors(corsOptions), (req, res) => {
  const status = {
    "Status": "Running",
    "Message": "Hello World!"
  }

  res.send(status)
});

require("./routes/course.routes")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

