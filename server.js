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
  // db.query("SELECT * FROM user", (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(result);
  //   }
  // });
});

// get user song
app.get("/user/:user_id/songs", (req, res) => {
  let user_id = req.query.user_id;
  db.query(
    "SELECT * FROM Song WHERE penyanyi_id = ?",
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// update song title and audio file path
app.put("/user/:user_id/songs/:song_id", (req, res) => {
  let user_id = req.query.user_id;
  let song_id = req.query.song_id;
  let title = req.body.title;
  let audio_file_path = req.body.audio_file_path;
  db.query(
    "UPDATE Song SET Judul = ?, audio_file_path = ? WHERE id = ?",
    [title, audio_file_path, song_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// update song title by id
app.put("/user/:user_id/songs/title/:song_id", (req, res) => {
  let user_id = req.query.user_id;
  let song_id = req.query.song_id;
  let title = req.query.title;

  db.query(
    "UPDATE Song SET Judul = ? WHERE penyanyi_id = ? AND song_id = ?",
    [title, user_id, song_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// update audio path
app.put("/user/:user_id/songs/audio/:song_id", (req, res) => {
  let user_id = req.query.user_id;
  let song_id = req.query.song_id;
  let audio_path = req.query.audio_path;

  db.query(
    "UPDATE Song SET Audio_path = ? WHERE penyanyi_id = ? AND song_id = ?",
    [audio_path, user_id, song_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// create song
app.post("/user/:user_id/songs", (req, res) => {
  let user_id = req.query.user_id;
  let title = req.query.title;
  let audio_path = req.query.audio_path;

  db.query(
    "INSERT INTO Song (penyanyi_id, Judul, audio_path) VALUES (?, ?, ?)",
    [user_id, title, audio_path],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// delete song
app.delete("/user/:user_id/songs/:song_id", (req, res) => {
  let user_id = req.query.user_id;
  let song_id = req.query.song_id;
  db.query(
    "DELETE FROM Song WHERE penyanyi_id = ? AND song_id = ?",
    [user_id, song_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
