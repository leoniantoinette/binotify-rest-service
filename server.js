const express = require("express");
const cors = require("cors");
const db = require("./services/db.js");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = 3001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const soapRequest = require("easy-soap-request");
const xml2js = require("xml2js");
const saltRounds = 10;
const dotenv = require("dotenv");
dotenv.config();
const API_KEY = process.env.API_KEY;

var corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const checkSubscription = (req, res) => {
  const ip = req.socket.remoteAddress;
  const endpoint = "/service/subscription";
  let user_id = req.params.user_id;
  let penyanyi_id = req.params.penyanyi_id;

  const url = "http://localhost:8081/service/subscription";
  const headers_req = {
    "Content-Type": "text/xml;charset=UTF-8",
  };
  const xml = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
        <checkSubscription xmlns="http://services.binotify/">
          <arg0 xmlns="">${ip}</arg0>
          <arg1 xmlns="">${endpoint}</arg1>
          <arg2 xmlns="">${penyanyi_id}</arg2>
          <arg3 xmlns="">${user_id}</arg3>
          <arg4 xmlns="">${API_KEY}</arg4>
        </checkSubscription>
      </Body>
  </Envelope>`;

  (async () => {
    const { response } = await soapRequest({
      url: url,
      headers: headers_req,
      xml: xml,
    });
    const { headers, body, statusCode } = response;
    var parser = new xml2js.Parser();
    parser.parseString(body, function (err, result) {
      var isSubscribed =
        result["S:Envelope"]["S:Body"][0]["ns2:checkSubscriptionResponse"][0]
          .return[0];
      if (statusCode == 200 && isSubscribed == "true") {
        db.query(
          "SELECT * FROM Song WHERE penyanyi_id = ?",
          [penyanyi_id],
          (err, result) => {
            if (err) {
              throw err;
            }
            res.status(200).send(result);
          }
        );
      } else {
        res.status(200).send();
      }
    });
  })();
};

const getSubscription = (req, res) => {
  const ip = req.socket.remoteAddress;
  const endpoint = "/service/subscription";
  const url = "http://localhost:8081/service/subscription";
  console.log("getAPI=", API_KEY);
  const headers_req = {
    "Content-Type": "text/xml;charset=UTF-8",
  };
  const xml = `
  <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <getSubscription xmlns="http://services.binotify/">
            <arg0 xmlns="">${ip}</arg0>
            <arg1 xmlns="">${endpoint}</arg1>
            <arg2 xmlns="">${API_KEY}</arg2>
        </getSubscription>
    </Body>
</Envelope>`;

  (async () => {
    const { response } = await soapRequest({
      url: url,
      headers: headers_req,
      xml: xml,
    });
    const { headers, body, statusCode } = response;
    var parser = new xml2js.Parser();
    parser.parseString(body, function (err, result) {
      if (statusCode == 200) {
        db.query("SELECT * FROM user", (err2, user) => {
          if (err2) {
            console.log(err2);
          } else {
            var listSubscription = [];
            var data =
              result["S:Envelope"]["S:Body"][0][
                "ns2:getSubscriptionResponse"
              ][0].return;
            for (var i = 0; i < data.length; i++) {
              data[i].creator_id = data[i].creator_id[0];
              data[i].subscriber_id = data[i].subscriber_id[0];
              data[i].status = data[i].status[0];
              data[i].creator_name = user.find(
                (x) => x.user_id == data[i].creator_id
              ).name;
              listSubscription.push(data[i]);
            }
          }
          res.status(200).send(listSubscription);
        });
      } else {
        res.status(200).send();
      }
    });
  })();
};

const approveSubscription = (req, res) => {
  const ip = req.socket.remoteAddress;
  const endpoint = "/service/subscription";
  let creatorID = req.body.creatorID;
  let subscriberID = req.body.subscriberID;

  const url = "http://localhost:8081/service/subscription";
  const headers_req = {
    "Content-Type": "text/xml;charset=UTF-8",
  };
  const xml = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
        <approveSubscription xmlns="http://services.binotify/">
          <arg0 xmlns="">${ip}</arg0>
          <arg1 xmlns="">${endpoint}</arg1>
          <arg2 xmlns="">${creatorID}</arg2>
          <arg3 xmlns="">${subscriberID}</arg3>
          <arg4 xmlns="">${API_KEY}</arg4>

        </approveSubscription>
      </Body>
  </Envelope>`;

  (async () => {
    const { response } = await soapRequest({
      url: url,
      headers: headers_req,
      xml: xml,
    });
    const { headers, body, statusCode } = response;
    var parser = new xml2js.Parser();
    parser.parseString(body, function (err, result) {
      var isSuccess =
        result["S:Envelope"]["S:Body"][0]["ns2:approveSubscriptionResponse"][0]
          .return[0];
      if (statusCode == 200 && isSuccess == "true") {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    });
  })();
};

const rejectSubscription = (req, res) => {
  const ip = req.socket.remoteAddress;
  const endpoint = "/service/subscription";
  let creatorID = req.body.creatorID;
  let subscriberID = req.body.subscriberID;

  const url = "http://localhost:8081/service/subscription";
  const headers_req = {
    "Content-Type": "text/xml;charset=UTF-8",
  };
  const xml = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
        <rejectSubscription xmlns="http://services.binotify/">
          <arg0 xmlns="">${ip}</arg0>
          <arg1 xmlns="">${endpoint}</arg1>
          <arg2 xmlns="">${creatorID}</arg2>
          <arg3 xmlns="">${subscriberID}</arg3>
          <arg4 xmlns="">${API_KEY}</arg4>

        </rejectSubscription>
      </Body>
  </Envelope>`;

  (async () => {
    const { response } = await soapRequest({
      url: url,
      headers: headers_req,
      xml: xml,
    });
    const { headers, body, statusCode } = response;
    var parser = new xml2js.Parser();
    parser.parseString(body, function (err, result) {
      var isSuccess =
        result["S:Envelope"]["S:Body"][0]["ns2:rejectSubscriptionResponse"][0]
          .return[0];
      if (statusCode == 200 && isSuccess == "true") {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    });
  })();
};

app.use(express.json());
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  // db.query("SELECT * FROM user", (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(result);
  //   }
  // });
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);
// get user song
app.get("/user/:user_id/songs", (req, res) => {
  let user_id = req.params.user_id;
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

// get song by id
app.get("/user/:user_id/songs/:song_id", (req, res) => {
  let song_id = req.params.song_id;
  let user_id = req.params.user_id;
  db.query(
    "SELECT * FROM Song WHERE penyanyi_id = ? AND song_id = ?",
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

// update song title and audio file path
app.put("/user/:user_id/songs/:song_id", (req, res) => {
  let user_id = req.params.user_id;
  let song_id = req.params.song_id;
  let title = req.body.title;
  let audio_path = req.body.audio_path;
  db.query(
    "UPDATE Song SET Judul = ?, audio_path = ? WHERE penyanyi_id = ? AND song_id = ?",
    [title, audio_path, user_id, song_id],
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
  let user_id = req.params.user_id;
  let song_id = req.params.song_id;
  let title = req.body.title;
  console.log(req.body);

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
  let user_id = req.params.user_id;
  let song_id = req.params.song_id;
  let audio_path = req.body.audio_path;

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
  let user_id = req.params.user_id;
  let title = req.body.title;
  let audio_path = req.body.audio_path;

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
  let user_id = req.params.user_id;
  let song_id = req.params.song_id;
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

// endpoint get list penyanyi
app.get("/api/list-penyanyi", (req, res) => {
  db.query(
    "SELECT user_id, name FROM user WHERE isAdmin = 0",
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(result);
    }
  );
});

// endpoint get list lagu dari penyanyi
app.get(
  "/api/list-lagu/user/:user_id/penyanyi/:penyanyi_id",
  checkSubscription
);

// endpoint get list subscription
app.get("/api/list-subscription", getSubscription);

// approve subscription
app.post("/approve-subscription", approveSubscription);

// approve subscription
app.post("/reject-subscription", rejectSubscription);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("We need a token, please give it to us next time!");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("isUserLoggedIn", verifyJWT, (req, res) => {
  res.send("yo, you are logged in");
});
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

//login sebagai penyanyi
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE username = ? ;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].user_id;
            const token = jwt.sign({ id }, "jwtSecret", {
              expiresIn: 300,
            });
            req.session.user = result;
            res.json({ auth: true, token: token, result: result });
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

//register sebagai penyanyi
app.post("/registers", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  const confirm = req.body.confirm;
  const isAdmin = 0;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (
      username != "" &&
      password != "" &&
      name != "" &&
      email != "" &&
      confirm != ""
    ) {
      db.query(
        "SELECT * FROM user WHERE username = ? or email= ? ;",
        [username, email],
        (err, result) => {
          if (result.length > 0) {
            res.send({ message: "Username Or Email Already Exist" });
          } else {
            db.query(
              "INSERT INTO user(email, password, username, name, isAdmin) VALUES (?,?,?,?,?)",
              [email, hash, username, name, isAdmin],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  db.query(
                    "SELECT * FROM user WHERE username = ? ;",
                    username,
                    (err, hasil) => {
                      if (err) {
                        res.send({ err: err });
                      }
                      if (hasil.length > 0) {
                        req.session.user = hasil;
                      }
                      res.send("Register berhasil");
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
      res.send({
        message: "Register belum selesai, Isi semua field!!",
      });
    }
  });
});
