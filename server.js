const express = require("express");
const cors = require("cors");
const db = require("./services/db.js");
const app = express();

const PORT = 8080;
var corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "welcome lul" });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
