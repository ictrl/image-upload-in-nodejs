const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const Img = require("./ImgModel");
const connectDB = require("./mongodb");
connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

app.post("/single", upload.single("single"), (req, res) => {
  if (req.file) {
    imgName = req.file.originalname;
    imgData = req.file.buffer;

    // store an img in binary in mongo
    img = new Img();
    img.img.data = imgData;
    img.img.contentType = "image/png";

    img.save(function(err, a) {
      if (!err)
        res.json({
          message: "New image added to the db!"
        });
    });
  }
});

app.post("/multiple", upload.array("multiple"), async (req, res) => {
  const files = req.files;

  console.log({ files });

  files.forEach((file, key) => {
    imgName = file.originalname;
    imgData = file.buffer;
    let img = new Img();

    img.img.data = imgData;
    img.img.contentType = "image/png";

    img.save((err, result) => {
      if (!err) {
        console.log("image", key, " saved");
      }
    });
  });
  res.send("upload imgs");
});

app.get("/showimgs", (req, res) => {
  Img.find({}, (err, imgs) => {
    imgs.forEach((img, key) => {
      res.contentType(img.img.contentType);
      res.send(img.img.data);
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen("3000", () => {
  console.log("server listening on 3000 port");
});
