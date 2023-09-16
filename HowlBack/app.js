const express = require('express')
const app = express()
const port = 3000

const db = require("./db.js");

db.sequelize.sync();

app.get('/', (req, res) => {
  // console.log(req);
  res.send('Hello World!')
});

require("./routes/course.routes")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

