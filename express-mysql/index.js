const express = require("express");
const yaml = require("js-yaml");
const fs = require("fs-extra");
const router = require("./routes");

const app = express();
let port = "";

try {
  let fileContents = fs.readFileSync("./config/dev.yaml", "utf8");
  data = yaml.load(fileContents);
  port = data["port"] || 3000;
} catch (error) {
  console.error(error);
}

app.use(express.json());

app.use(router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
