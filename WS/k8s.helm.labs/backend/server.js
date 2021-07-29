const connectDatabase = require("./src/connection");
const app = require("./src/app");
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  connectDatabase()
    .then(() => {
      console.log("MongoDb connected");
    })
    .catch((err) => {
      console.log("Can not connect to mongodb");
      process.exit(1);
    });
});
