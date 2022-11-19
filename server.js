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

// get all premium songs
app.get("/me/songs", (req, res) => {
  res.json({ message: "my songs" });
});

// update song title by id
app.put("/me/songs/:id", (req, res) => {
  res.json({ message: "update song" });
});

// update audio path
app.put("/me/songs/:id/audio", (req, res) => {
  res.json({ message: "update audio" });
});

// create song
app.post("/me/songs", (req, res) => {
  res.json({ message: "create song" });
});

// delete song
app.delete("/me/songs/:id", (req, res) => {
  res.json({ message: "delete song" });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
