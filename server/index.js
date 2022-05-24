const express = require("express");
const ImageKit = require("imagekit");
const router = express.Router();
var cors = require("cors");
const app = express();
app.use(cors());

const imagekit = new ImageKit({
  publicKey: "public_5omC/8jvgPY4PdvyA8kOfAL2Vnk=",
  privateKey: "private_SNFu+L8nxSrSAgKBccgBt9R/E9Q=",
  urlEndpoint: "https://ik.imagekit.io/FEretainiq",
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", router);

app.get("/auth", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.get("/fetch", function (req, res) {
  imagekit.listFiles(
    {
      type: "all",
    },
    function (error, result) {
      if (error) console.log(error);
      else res.send(result);
    }
  );
});

app.listen(3001, function () {
  console.log("Live at Port 3001");
});
